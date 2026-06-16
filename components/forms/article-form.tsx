"use client";

import { useActionState, useState } from "react";
import type { Category, Tag } from "@prisma/client";
import type { ActionResult } from "@/lib/actions/auth";
import { FormMessage, FormField } from "@/components/forms/form-fields";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { isEditorContentEmpty } from "@/lib/sanitize/html";

type ArticleFormData = {
  title: string;
  content: string;
  excerpt?: string | null;
  categoryId?: string | null;
  tags: { tag: Tag }[];
};

type FormAction = (
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

export function ArticleForm({
  action,
  categories,
  tags,
  article,
  submitLabel = "Simpan",
}: {
  action: FormAction;
  categories: Category[];
  tags: Tag[];
  article?: ArticleFormData;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState(action, null);
  const [content, setContent] = useState(article?.content ?? "");
  const [contentError, setContentError] = useState<string | null>(null);
  const selectedTagIds = article?.tags.map((t) => t.tag.id) ?? [];

  return (
    <form
      action={formAction}
      className="space-y-6"
      onSubmit={(event) => {
        if (isEditorContentEmpty(content)) {
          event.preventDefault();
          setContentError("Isi artikel wajib diisi");
          return;
        }
        setContentError(null);
      }}
    >
      <FormMessage state={state} />
      {state?.success && (
        <p className="text-sm text-green-600">Perubahan berhasil disimpan.</p>
      )}

      <FormField
        label="Judul"
        name="title"
        required
        defaultValue={article?.title}
      />
      <FormField
        label="Ringkasan (opsional)"
        name="excerpt"
        defaultValue={article?.excerpt ?? ""}
        placeholder="Cuplikan singkat untuk halaman beranda"
      />

      <div className="space-y-2">
        <Label htmlFor="content">Isi Artikel</Label>
        <input type="hidden" name="content" value={content} />
        <RichTextEditor
          value={content}
          onChange={(html) => {
            setContent(html);
            if (!isEditorContentEmpty(html)) {
              setContentError(null);
            }
          }}
          placeholder="Tulis isi artikel di sini..."
        />
        {contentError && (
          <p className="text-sm text-destructive">{contentError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Kategori</Label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={article?.categoryId ?? ""}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Tanpa kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Tag</Label>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="tagIds"
                value={tag.id}
                defaultChecked={selectedTagIds.includes(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Belum ada tag. Buat tag terlebih dahulu di menu Tag.
          </p>
        )}
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
