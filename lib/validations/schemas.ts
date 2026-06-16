import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi").max(100),
});

export const tagSchema = z.object({
  name: z.string().min(1, "Nama tag wajib diisi").max(100),
});

export const articleSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200),
  content: z.string().min(1, "Isi artikel wajib diisi"),
  excerpt: z.string().max(500).optional(),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

export const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter").optional(),
  role: z.enum(["ADMIN", "EDITOR", "AUTHOR"]),
  active: z.boolean().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(200),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  price: z.coerce.number().positive("Harga harus lebih dari 0"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  published: z.coerce.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TagInput = z.infer<typeof tagSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type ProductInput = z.infer<typeof productSchema>;
