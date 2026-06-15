import Link from "next/link";
import type { Metadata } from "next";
import { loginAction } from "@/lib/actions/auth";
import { ActionForm, FormField } from "@/components/forms/form-fields";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Masuk ke Dashboard</CardTitle>
          <CardDescription>
            Gunakan akun Admin, Editor, atau Penulis Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm action={loginAction} className="space-y-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              required
            />
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </ActionForm>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="underline">
              Kembali ke blog
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
