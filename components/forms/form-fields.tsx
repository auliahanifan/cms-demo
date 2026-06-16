"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SuccessMessage } from "@/components/patterns/success-message";

type FormAction = (
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

export function FormMessage({ state }: { state: ActionResult | null }) {
  if (!state?.error) return null;
  return (
    <Alert variant="destructive">
      <AlertDescription>{state.error}</AlertDescription>
    </Alert>
  );
}

export function SubmitButton({ label }: { label: string }) {
  return <Button type="submit">{label}</Button>;
}

export function ActionForm({
  action,
  children,
  className,
}: {
  action: FormAction;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className={className}>
      <FormMessage state={state} />
      {children}
      {state?.success && (
        <SuccessMessage>Berhasil disimpan.</SuccessMessage>
      )}
    </form>
  );
}

export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
