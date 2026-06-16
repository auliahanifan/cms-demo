import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Package,
  Pencil,
  Search,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { EmptyState } from "@/components/patterns/empty-state";
import { SuccessMessage } from "@/components/patterns/success-message";
import { StatCard } from "@/components/patterns/stat-card";
import { SectionHeading } from "@/components/patterns/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = { title: "Design System" };

const colorTokens = [
  { name: "Primary", className: "bg-primary", text: "text-primary-foreground" },
  { name: "Secondary", className: "bg-secondary", text: "text-secondary-foreground" },
  { name: "Muted", className: "bg-muted", text: "text-muted-foreground" },
  { name: "Accent", className: "bg-accent", text: "text-accent-foreground" },
  { name: "Destructive", className: "bg-destructive", text: "text-white" },
  { name: "Success", className: "bg-success", text: "text-success-foreground" },
  { name: "Warning", className: "bg-warning", text: "text-warning-foreground" },
  { name: "Info", className: "bg-info", text: "text-info-foreground" },
  { name: "Card", className: "bg-card border", text: "text-card-foreground" },
  { name: "Background", className: "bg-background border", text: "text-foreground" },
];

const spacingScale = [1, 2, 3, 4, 6, 8, 12, 16];

const shadowScale = [
  { name: "shadow-xs", className: "shadow-xs" },
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
];

const radiusScale = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
];

const sidebarIcons = [
  { icon: LayoutDashboard, label: "Ringkasan" },
  { icon: FileText, label: "Artikel" },
  { icon: Package, label: "Produk" },
  { icon: Tag, label: "Kategori / Tag" },
  { icon: Users, label: "Pengguna" },
  { icon: Settings, label: "Design System" },
  { icon: Search, label: "Pencarian" },
  { icon: Pencil, label: "Edit" },
];

function ShowcaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 space-y-4">
      <SectionHeading title={title} />
      {children}
    </section>
  );
}

export default async function DesignSystemPage() {
  await requireRole("ADMIN");

  return (
    <PageContainer variant="dashboard" className="space-y-12 pb-12">
      <PageHeader
        title="Design System"
        description="Referensi token, primitives, dan pola komponen Vibe Coding Class CMS."
      />

      <nav className="flex flex-wrap gap-2 text-sm">
        {[
          "colors",
          "typography",
          "spacing",
          "shadows",
          "primitives",
          "patterns",
          "icons",
        ].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-md border px-3 py-1 capitalize hover:bg-muted"
          >
            {id}
          </a>
        ))}
      </nav>

      <ShowcaseSection id="colors" title="Colors">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className={`flex h-20 items-end rounded-lg p-3 ${token.className} ${token.text}`}
            >
              <span className="text-sm font-medium">{token.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-success">text-success</span>
          <span className="text-warning">text-warning</span>
          <span className="text-info">text-info</span>
          <span className="text-destructive">text-destructive</span>
          <span className="text-primary">text-primary</span>
          <span className="text-muted-foreground">text-muted-foreground</span>
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="typography" title="Typography">
        <div className="space-y-4 rounded-lg border p-6">
          <p className="text-display">Display — Judul halaman publik</p>
          <p className="text-heading-1">Heading 1 — Judul halaman dashboard</p>
          <p className="text-heading-2">Heading 2 — Judul section</p>
          <p className="text-body">Body — Teks UI default (text-sm)</p>
          <p className="text-caption">Caption — Meta, timestamp, hint</p>
          <div className="prose prose-neutral max-w-none text-sm">
            <p>
              Prose — Konten artikel dengan <strong>typography plugin</strong>{" "}
              untuk paragraf panjang.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="spacing" title="Spacing & Layout">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Skala spacing Tailwind (rem) dan lebar kontainer:
          </p>
          <div className="flex flex-wrap items-end gap-4">
            {spacingScale.map((n) => (
              <div key={n} className="text-center">
                <div
                  className="bg-primary/20"
                  style={{ width: `${n * 0.25}rem`, height: `${n * 0.25}rem` }}
                />
                <p className="mt-1 text-caption">{n}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">public / form</p>
              <p className="text-caption">max-w-3xl</p>
            </div>
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">medium</p>
              <p className="text-caption">max-w-4xl</p>
            </div>
            <div className="rounded-lg border border-dashed p-4">
              <p className="text-sm font-medium">dashboard</p>
              <p className="text-caption">max-w-6xl</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="shadows" title="Shadows & Radius">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shadowScale.map((shadow) => (
            <div
              key={shadow.name}
              className={`rounded-lg border bg-card p-6 ${shadow.className}`}
            >
              <p className="text-sm font-medium">{shadow.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {radiusScale.map((radius) => (
            <div
              key={radius.name}
              className={`h-16 w-16 border bg-muted ${radius.className}`}
            />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="primitives" title="Primitives">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Button</Label>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ds-input">Input</Label>
              <Input id="ds-input" placeholder="Placeholder..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ds-textarea">Textarea</Label>
              <Textarea id="ds-textarea" placeholder="Deskripsi..." rows={2} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Badge</Label>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Alert</Label>
            <div className="space-y-2">
              <Alert>
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>Pesan informasi umum.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2 />
                <AlertTitle>Berhasil</AlertTitle>
                <AlertDescription>Operasi selesai tanpa error.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertCircle />
                <AlertTitle>Peringatan</AlertTitle>
                <AlertDescription>Periksa kembali sebelum melanjutkan.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Terjadi kesalahan saat menyimpan.</AlertDescription>
              </Alert>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Table</Label>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kolom</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Contoh baris</TableCell>
                    <TableCell>
                      <Badge>Dipublikasikan</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="patterns" title="Patterns">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-caption">PageHeader</p>
            <PageHeader
              title="Judul Halaman"
              description="Deskripsi singkat halaman."
              actions={<Button size="sm">Aksi</Button>}
            />
          </div>

          <div className="space-y-2">
            <p className="text-caption">StatCard</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total Artikel" value={42} />
              <StatCard label="Draft" value={5} description="Belum dipublikasikan" />
              <StatCard label="Dipublikasikan" value={37} />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-caption">SuccessMessage</p>
            <SuccessMessage>Perubahan berhasil disimpan.</SuccessMessage>
          </div>

          <div className="space-y-2">
            <p className="text-caption">EmptyState</p>
            <EmptyState
              icon={<Package />}
              title="Belum ada produk"
              description="Mulai dengan menambahkan produk pertama."
              action={
                <Link
                  href="/dashboard/products/new"
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Buat produk
                </Link>
              }
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection id="icons" title="Icons">
        <p className="text-sm text-muted-foreground">
          Ikon Lucide yang umum dipakai di aplikasi:
        </p>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {sidebarIcons.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
            >
              <Icon className="size-5 text-muted-foreground" />
              <span className="text-caption">{label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </PageContainer>
  );
}
