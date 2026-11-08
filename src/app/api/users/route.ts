import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function requireAdmin() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح", status: 401 as const };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, clinic_id, is_active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_active) {
    return { error: "الحساب غير نشط", status: 403 as const };
  }
  if (!["clinic_admin", "super_admin"].includes(profile.role)) {
    return { error: "صلاحيات غير كافية", status: 403 as const };
  }
  return { user, profile };
}

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, is_active, phone, created_at")
    .eq("clinic_id", auth.profile.clinic_id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const { email, password, full_name, role = "receptionist", phone } = body;

  if (!email || !password || !full_name) {
    return NextResponse.json({ error: "الحقول مطلوبة" }, { status: 400 });
  }

  const admin = getAdminClient();

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !created.user) {
    return NextResponse.json(
      { error: createError?.message || "فشل إنشاء المستخدم" },
      { status: 400 }
    );
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: created.user.id,
    clinic_id: auth.profile.clinic_id,
    full_name,
    role,
    phone: phone || null,
    is_active: true,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({
    user: {
      id: created.user.id,
      email,
      full_name,
      role,
      is_active: true,
    },
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const { userId, is_active, full_name, role, email, password } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId مطلوب" }, { status: 400 });
  }

  if (userId === auth.user.id && is_active === false) {
    return NextResponse.json({ error: "لا يمكنك إيقاف حسابك" }, { status: 400 });
  }

  const admin = getAdminClient();
  const supabase = await createServerClient();

  // Verify same clinic
  const { data: target } = await supabase
    .from("profiles")
    .select("clinic_id")
    .eq("id", userId)
    .single();

  if (!target || target.clinic_id !== auth.profile.clinic_id) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof is_active === "boolean") updates.is_active = is_active;
  if (full_name) updates.full_name = full_name;
  if (role) updates.role = role;

  if (Object.keys(updates).length) {
    const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (email || password) {
    const authUpdates: { email?: string; password?: string } = {};
    if (email) authUpdates.email = email;
    if (password) authUpdates.password = password;
    const { error: authErr } = await admin.auth.admin.updateUserById(userId, authUpdates);
    if (authErr) return NextResponse.json({ error: authErr.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId مطلوب" }, { status: 400 });
  }
  if (userId === auth.user.id) {
    return NextResponse.json({ error: "لا يمكنك حذف حسابك" }, { status: 400 });
  }

  const supabase = await createServerClient();
  const { data: target } = await supabase
    .from("profiles")
    .select("clinic_id")
    .eq("id", userId)
    .single();

  if (!target || target.clinic_id !== auth.profile.clinic_id) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  const admin = getAdminClient();
  await supabase.from("profiles").delete().eq("id", userId);
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
