import { Plus } from 'lucide-react'

/**
 * FAQ list.
 *
 * Built on native <details>/<summary> rather than JS state, for three reasons:
 * the answers are present and readable in the prerendered HTML even with the
 * bundle disabled, keyboard and screen-reader behaviour comes free and correct,
 * and browser in-page find can open a collapsed answer.
 */
export default function FaqAccordion({
  faqs,
  invert = false,
}: {
  faqs: { q: string; a: string }[]
  invert?: boolean
}) {
  const line = invert ? 'border-paper/14' : 'border-ink/12'
  const answer = invert ? 'text-paper/68' : 'text-ink/68'

  return (
    <div className={`border-t ${line}`}>
      {faqs.map((faq) => (
        <details key={faq.q} className={`group border-b ${line}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.02rem] font-semibold leading-snug sm:text-[1.12rem]">
              {faq.q}
            </h3>
            <span
              className={`mt-0.5 shrink-0 rounded-full border p-1.5 transition-transform duration-300 ease-smooth group-open:rotate-45 ${line}`}
              aria-hidden="true"
            >
              <Plus size={15} strokeWidth={2.4} />
            </span>
          </summary>
          <p className={`max-w-prose pb-7 pr-10 leading-relaxed ${answer}`}>
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  )
}
