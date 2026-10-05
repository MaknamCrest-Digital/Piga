"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";
import { initialFormState } from "@/lib/forms/types";
import { FormStatus, Honeypot, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { TOPICS } from "./topics";

export function ContactForm({ defaultTopic }: { defaultTopic: string }) {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const e = state.errors ?? {};

  if (state.status === "success") {
    return <div className="rounded-card border border-line bg-paper p-10 shadow-soft"><FormStatus status="success" message={state.message} /></div>;
  }

  return (
    <form action={action} noValidate className="relative grid gap-5 rounded-card border border-line bg-paper p-6 shadow-soft sm:grid-cols-2 sm:p-10">
      <Honeypot />
      <h2 className="text-2xl font-semibold sm:col-span-2">Send a message</h2>
      <SelectField label="Topic" name="topic" options={TOPICS} defaultValue={defaultTopic} className="sm:col-span-2" />
      <TextField label="Name" name="name" autoComplete="name" error={e.name} />
      <TextField label="Organisation" name="organisation" optional autoComplete="organization" />
      <TextField label="Email" name="email" type="email" optional autoComplete="email" error={e.email} />
      <TextField label="Phone" name="phone" type="tel" optional autoComplete="tel" />
      <TextArea label="How can we help?" name="message" className="sm:col-span-2" error={e.message} />
      <div className="space-y-4 sm:col-span-2">
        <FormStatus status={state.status} message={state.message} />
        <Button type="submit" variant="primary" arrow disabled={pending}>{pending ? "Sending…" : "Send message"}</Button>
      </div>
    </form>
  );
}
