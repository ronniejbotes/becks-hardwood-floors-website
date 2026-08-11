import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Loader2, Phone } from 'lucide-react'
import { site } from '../site.config'

/**
 * Lead form.
 *
 * Posts to Web3Forms — no backend, so it works on plain static Hostinger
 * hosting. The access key comes from VITE_W3F_KEY at build time; see .env.example.
 *
 * If the key is absent the form does NOT pretend to submit. Silently swallowing
 * a real enquiry is the single worst failure mode a contractor site can have,
 * so with no key configured it says so and shows the phone number instead.
 */

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_W3F_KEY as string | undefined

const SERVICES = [
  'Sand & refinish existing floors',
  'New hardwood installation',
  'Floor repair / board replacement',
  'Luxury vinyl plank (waterproof)',
  'Not sure yet — need advice',
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const configured = Boolean(ACCESS_KEY)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!configured) return

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: real people leave it empty, most bots fill everything.
    if (data.get('botcheck')) return

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      const json = (await res.json()) as { success?: boolean; message?: string }

      if (res.ok && json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
        setErrorMsg(json.message || 'That did not go through.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Could not reach the server. Check your connection.')
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-card border border-oak/25 bg-white p-8 text-center shadow-lift sm:p-12"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-oak/12">
          <Check size={26} className="text-oak-deep" strokeWidth={2.6} />
        </div>
        <h3 className="h-section mb-3 text-2xl sm:text-3xl">Thanks — that's through.</h3>
        <p className="mx-auto max-w-md text-ink/68">
          {site.owner.split(' ')[0]} will get back to you about your floors. If
          it's urgent, calling is always faster.
        </p>
        <a
          href={`tel:${site.phone.e164}`}
          className="mt-6 inline-flex items-center gap-2 rounded-pill border-2 border-ink/20 px-6 py-3 font-semibold transition hover:bg-ink/5"
        >
          <Phone size={17} strokeWidth={2.4} aria-hidden="true" />
          {site.phone.display}
        </a>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-ink/10 bg-white p-6 shadow-lift sm:p-8"
      noValidate={false}
    >
      {/* Web3Forms control fields */}
      <input type="hidden" name="access_key" value={ACCESS_KEY ?? ''} />
      <input
        type="hidden"
        name="subject"
        value={`New quote request — ${site.name} website`}
      />
      <input type="hidden" name="from_name" value={`${site.name} website`} />
      {/* Honeypot — hidden from people, visible to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jane Whitaker"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(336) 555-0142"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          hint="Optional"
          className="sm:col-span-2"
        />
        <Field
          label="Where are the floors?"
          name="location"
          autoComplete="address-level2"
          placeholder="Clemmons, NC"
          hint="Town or neighborhood"
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="cf-service"
            className="text-[0.82rem] font-semibold tracking-wide text-ink/75"
          >
            What do you need?
          </label>
          <select
            id="cf-service"
            name="service"
            defaultValue={SERVICES[0]}
            className="w-full rounded-xl border border-ink/16 bg-paper px-4 py-3 text-[0.95rem] transition focus:border-oak focus:bg-white"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="cf-message"
            className="text-[0.82rem] font-semibold tracking-wide text-ink/75"
          >
            Tell us about the job{' '}
            <span className="font-normal text-ink/45">
              — rooms, rough square footage, age of the floors, anything odd
            </span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            placeholder="Three bedrooms and a hallway of red oak, probably original to the house (1962). Some water staining near the back door."
            className="w-full resize-y rounded-xl border border-ink/16 bg-paper px-4 py-3 text-[0.95rem] leading-relaxed transition focus:border-oak focus:bg-white"
          />
        </div>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-[0.88rem] text-red-800"
          >
            <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              {errorMsg} Please call{' '}
              <a href={`tel:${site.phone.e164}`} className="font-semibold underline">
                {site.phone.display}
              </a>{' '}
              instead — we don't want to lose your enquiry.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {!configured && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-3.5 text-[0.88rem] text-amber-900"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <strong>Form not connected yet.</strong> Add{' '}
            <code className="rounded bg-amber-100 px-1">VITE_W3F_KEY</code> to{' '}
            <code className="rounded bg-amber-100 px-1">.env</code> and rebuild.
            Until then this button is disabled so no enquiry is lost silently.
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending' || !configured}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-oak px-8 py-4 font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:bg-oak-deep hover:shadow-lift-lg disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Request a free quote'
          )}
        </button>
        <p className="text-[0.82rem] leading-relaxed text-ink/55">
          Or just call{' '}
          <a
            href={`tel:${site.phone.e164}`}
            className="font-semibold text-ink underline decoration-oak decoration-2 underline-offset-2"
          >
            {site.phone.display}
          </a>
        </p>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
  inputMode,
  hint,
  className = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  hint?: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={`cf-${name}`}
        className="text-[0.82rem] font-semibold tracking-wide text-ink/75"
      >
        {label}
        {required && <span className="ml-1 text-oak">*</span>}
        {hint && <span className="ml-1.5 font-normal text-ink/45">{hint}</span>}
      </label>
      <input
        id={`cf-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-xl border border-ink/16 bg-paper px-4 py-3 text-[0.95rem] transition placeholder:text-ink/30 focus:border-oak focus:bg-white"
      />
    </div>
  )
}
