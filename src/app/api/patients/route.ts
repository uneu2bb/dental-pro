import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

async function getAuthClinic() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح", status: 401 as const };

  const { data: profile } = await supabase
    .from("profiles")
    .select("clinic_id, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_active || !profile.clinic_id) {
    return { error: "لا توجد عيادة مرتبطة", status: 403 as const };
  }

  return { supabase, user, profile };
}

export async function GET(request: Request) {
  const auth = await getAuthClinic();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  let query = auth.supabase
    .from("patients")
    .select("*")
    .eq("clinic_id", auth.profile.clinic_id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,phone.ilike.%${q}%,file_number.ilike.%${q}%`
    );
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ patients: data || [] });
}

export async function POST(request: Request) {
  const auth = await getAuthClinic();
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json();
  const {
    full_name,
    phone,
    email,
    gender,
    date_of_birth,
    address,
    notes,
    allergies,
    medical_history,
  } = body;

  if (!full_name || !phone) {
    return NextResponse.json(
      { error: "الاسم ورقم الهاتف مطلوبان" },
      { status: 400 }
    );
  }

  // Generate simple file number
  const file_number = `P-${Date.now().toString().slice(-6)}`;

  const { data, error } = await auth.supabase
    .from("patients")
    .insert({
      clinic_id: auth.profile.clinic_id,
      full_name,
      phone,
      email: email || null,
      gender: gender || null,
      date_of_birth: date_of_birth || null,
      address: address || null,
      notes: notes || null,
      allergies: allergies || null,
      medical_history: medical_history || null,
      file_number,
      status: "active",
      balance: 0,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ patient: data });
}
