"use client";

import { useActionState, useRef, useState } from "react";
import type { Product } from "@prisma/client";
import type { ActionResult } from "@/lib/actions/auth";
import { FormMessage, FormField } from "@/components/forms/form-fields";
import { SuccessMessage } from "@/components/patterns/success-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormAction = (
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

type ProductFormData = Pick<
  Product,
  "name" | "description" | "price" | "imageUrl" | "published"
>;

export function ProductForm({
  action,
  product,
  submitLabel = "Simpan",
}: {
  action: FormAction;
  product?: ProductFormData;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, null);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok) {
        setUploadError(data.error ?? "Gagal mengunggah gambar");
        return;
      }

      if (data.url) {
        setImageUrl(data.url);
      }
    } catch {
      setUploadError("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <FormMessage state={state} />
      {state?.success && (
        <SuccessMessage>Perubahan berhasil disimpan.</SuccessMessage>
      )}

      <FormField
        label="Nama Produk"
        name="name"
        required
        defaultValue={product?.name}
      />

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          defaultValue={product?.description}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Deskripsi produk..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Harga (IDR)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          required
          min="1"
          step="1"
          defaultValue={product ? String(product.price) : undefined}
          placeholder="100000"
        />
      </div>

      <div className="space-y-2">
        <Label>Gambar Produk</Label>
        <input type="hidden" name="imageUrl" value={imageUrl} />
        {imageUrl && (
          <div className="relative w-full max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Preview produk"
              className="rounded-md border object-cover"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setImageUrl("")}
            >
              Hapus Gambar
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleImageUpload(file);
            event.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? "Mengunggah..." : imageUrl ? "Ganti Gambar" : "Unggah Gambar"}
        </Button>
        {uploadError && (
          <p className="text-sm text-destructive">{uploadError}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product?.published}
        />
        Publikasikan
      </label>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );

}
