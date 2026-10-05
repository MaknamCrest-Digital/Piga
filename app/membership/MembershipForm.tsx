"use client";

import { useActionState, useState } from "react";
import { LocateFixed, Plus, Trash2 } from "lucide-react";
import { submitMembership } from "./actions";
import { initialFormState } from "@/lib/forms/types";
import { FormStatus, Honeypot, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const REGIONS = [
  "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", "Greater Accra", "North East",
  "Northern", "Oti", "Savannah", "Upper East", "Upper West", "Volta", "Western", "Western North",
];
const VARIETIES = ["Sugar Loaf", "MD2", "Smooth Cayenne", "Queen Victoria", "Other"];

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 border-t border-line pt-8 first:border-0 first:pt-0 sm:grid-cols-2">
      <legend className="mb-1 font-display text-xl font-semibold tracking-tight text-forest-900 sm:col-span-2">{legend}</legend>
      {children}
    </fieldset>
  );
}

export function MembershipForm() {
  const [state, action, pending] = useActionState(submitMembership, initialFormState);
  const [rows, setRows] = useState([0]);
  const [owner, setOwner] = useState("");
  const [gps, setGps] = useState("");
  const [locating, setLocating] = useState(false);
  const e = state.errors ?? {};

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => { setGps(`${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`); setLocating(false); },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  if (state.status === "success") {
    return <div className="rounded-card border border-line bg-paper p-10 shadow-soft"><FormStatus status="success" message={state.message} /></div>;
  }

  return (
    <form action={action} noValidate className="relative space-y-8 rounded-card border border-line bg-paper p-6 shadow-soft sm:p-10">
      <Honeypot />

      <Fieldset legend="About you">
        <TextField label="First name" name="firstName" autoComplete="given-name" error={e.firstName} />
        <TextField label="Surname" name="surname" autoComplete="family-name" error={e.surname} />
        <TextField label="Middle name" name="middleName" optional autoComplete="additional-name" />
        <TextField label="Ghana Card number" name="ghanaCard" placeholder="GHA-123456789-0" error={e.ghanaCard} />
        <TextField label="Telephone" name="phone" type="tel" autoComplete="tel" placeholder="059 159 8095" error={e.phone} />
      </Fieldset>

      <Fieldset legend="Your farm">
        <SelectField label="Region" name="region" options={REGIONS} error={e.region} />
        <TextField label="Village" name="village" error={e.village} />
        <div className="sm:col-span-2">
          <label htmlFor="gps" className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-forest-900">
            GPS location <span className="text-xs font-normal text-muted">Optional</span>
          </label>
          <div className="flex gap-2">
            <input id="gps" name="gps" value={gps} onChange={(ev) => setGps(ev.target.value)} placeholder="Latitude, longitude"
              className="h-12 w-full rounded-xl border border-line bg-paper px-4 text-[15px] focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-200/60" />
            <button type="button" onClick={locate} className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl border border-line bg-mint-50 px-4 text-sm font-semibold text-forest-800 hover:bg-mint-100">
              <LocateFixed size={16} aria-hidden /> {locating ? "Locating…" : "Use my location"}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-muted">Best done while standing on the farm.</p>
        </div>
        <TextField label="Total acreage" name="totalAcreage" inputMode="decimal" error={e.totalAcreage} />
        <TextField label="Age of farm (years)" name="farmAge" inputMode="numeric" error={e.farmAge} />
        <SelectField label="Are you the farm owner?" name="farmOwner" options={["Yes", "No"]} error={e.farmOwner} onChange={(ev) => setOwner(ev.target.value)} />
        {owner === "No" && <TextArea label="Owner details" name="ownerDetails" rows={3} className="sm:col-span-2" hint="Name and contact of the farm owner." error={e.ownerDetails} />}
      </Fieldset>

      <fieldset className="border-t border-line pt-8">
        <legend className="mb-1 font-display text-xl font-semibold tracking-tight text-forest-900">Your crop</legend>
        <p className="mb-5 text-sm text-muted">Add a row for each variety you grow.</p>
        <div className="space-y-3">
          {rows.map((r, i) => (
            <div key={r} className="grid gap-3 rounded-2xl bg-mint-25 p-4 ring-1 ring-line sm:grid-cols-[1.3fr_1fr_1fr_1.2fr_auto] sm:items-end">
              <label className="text-xs font-semibold text-forest-900">Variety
                <select name="cropVariety" defaultValue="" className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm font-normal">
                  <option value="" disabled>Select…</option>
                  {VARIETIES.map((v) => <option key={v}>{v}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold text-forest-900">Acreage
                <input name="cropAcreage" inputMode="decimal" className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm font-normal" />
              </label>
              <label className="text-xs font-semibold text-forest-900">Harvest
                <input name="cropHarvest" placeholder="e.g. 20 t" className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm font-normal" />
              </label>
              <label className="text-xs font-semibold text-forest-900">Method
                <select name="cropMethod" defaultValue="Conventional" className="mt-1 h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm font-normal">
                  <option>Conventional</option><option>Organic</option>
                </select>
              </label>
              <button type="button" aria-label={`Remove row ${i + 1}`} disabled={rows.length === 1}
                onClick={() => setRows(rows.filter((x) => x !== r))}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-paper hover:text-forest-900 disabled:opacity-30">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setRows([...rows, Math.max(...rows) + 1])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700">
          <Plus size={16} aria-hidden /> Add another variety
        </button>
      </fieldset>

      <Fieldset legend="Referral">
        <TextField label="Field officer" name="fieldOfficer" optional />
        <TextField label="Aggregator" name="aggregator" optional />
      </Fieldset>

      <div className="space-y-4 border-t border-line pt-8">
        <FormStatus status={state.status} message={state.message} />
        <p className="text-xs leading-5 text-muted">Your Ghana Card number and contact details are used only to process your membership.</p>
        <Button type="submit" variant="accent" arrow disabled={pending}>{pending ? "Sending…" : "Submit application"}</Button>
      </div>
    </form>
  );
}
