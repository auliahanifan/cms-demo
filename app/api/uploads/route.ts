import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import {
  ARTICLE_IMAGES_BUCKET,
  createSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function extensionForType(type: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "bin";
  }
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Upload belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Format file harus JPEG, PNG, atau WebP" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Ukuran file maksimal 5MB" },
      { status: 400 }
    );
  }

  const ext = extensionForType(file.type);
  const path = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

  try {
    const supabase = createSupabaseAdmin();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from(ARTICLE_IMAGES_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage
      .from(ARTICLE_IMAGES_BUCKET)
      .getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal mengunggah gambar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
