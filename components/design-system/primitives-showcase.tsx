import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export function PrimitivesShowcase() {
  return (
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
  );
}
