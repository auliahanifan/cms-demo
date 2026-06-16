"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/lib/actions/auth";
import { FormMessage, FormField } from "@/components/forms/form-fields";
import { SuccessMessage } from "@/components/patterns/success-message";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Item = { id: string; name: string; slug: string };

type CreateAction = (
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

type UpdateAction = (
  id: string,
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

export function CategoryTagManager({
  title,
  description,
  items,
  createAction,
  updateAction,
  deleteAction,
  emptyMessage,
}: {
  title: string;
  description: string;
  items: Item[];
  createAction: CreateAction;
  updateAction: UpdateAction;
  deleteAction: (id: string) => Promise<ActionResult>;
  emptyMessage: string;
}) {
  const [createState, createFormAction] = useActionState(createAction, null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <form action={createFormAction} className="flex max-w-md gap-2">
        <div className="flex-1">
          <FormField label={`Nama ${title}`} name="name" required placeholder={`Nama ${title.toLowerCase()}`} />
        </div>
        <div className="flex items-end">
          <Button type="submit">Tambah</Button>
        </div>
      </form>
      <FormMessage state={createState} />
      {createState?.success && (
        <SuccessMessage>Berhasil ditambahkan.</SuccessMessage>
      )}

      {items.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-32" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  updateAction={updateAction}
                  deleteAction={deleteAction}
                  pending={pending}
                  startTransition={startTransition}
                  onDeleted={() => router.refresh()}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ItemRow({
  item,
  updateAction,
  deleteAction,
  pending,
  startTransition,
  onDeleted,
}: {
  item: Item;
  updateAction: UpdateAction;
  deleteAction: (id: string) => Promise<ActionResult>;
  pending: boolean;
  startTransition: (fn: () => void) => void;
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const boundUpdate = updateAction.bind(null, item.id);
  const [state, formAction] = useActionState(boundUpdate, null);

  return (
    <TableRow>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell className="text-muted-foreground">{item.slug}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Edit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit {item.name}</DialogTitle>
              </DialogHeader>
              <form
                action={formAction}
                className="space-y-4"
                onSubmit={() => setTimeout(() => setOpen(false), 500)}
              >
                <FormMessage state={state} />
                <FormField label="Nama" name="name" defaultValue={item.name} required />
                <Button type="submit">Simpan</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await deleteAction(item.id);
                onDeleted();
              })
            }
          >
            Hapus
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
