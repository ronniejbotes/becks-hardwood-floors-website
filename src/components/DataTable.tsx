import type { ServiceTable } from '../content/services'

/**
 * Comparison table.
 *
 * Real <table>/<thead>/<tbody>/<th scope> markup — deliberately NOT a grid of
 * divs. A div grid renders identically and is invisible to anything trying to
 * extract the comparison, which is exactly the content most likely to be pulled
 * into an answer. Wrapped in an overflow-x container so it does not silently
 * break the mobile layout.
 */
export default function DataTable({ table }: { table: ServiceTable }) {
  return (
    <figure className="my-10">
      <div className="table-scroll rounded-2xl border border-ink/12 bg-white">
        <table className="w-full border-collapse text-left text-[0.92rem]">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="border-b border-ink/12 bg-sand/60">
              {table.headers.map((h, i) => (
                <th
                  key={h || i}
                  scope="col"
                  className="whitespace-nowrap px-5 py-4 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink/70"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-ink/8 last:border-0">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th
                      key={i}
                      scope="row"
                      className="whitespace-nowrap px-5 py-4 font-semibold"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-5 py-4 text-ink/72">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-ink/50">
          {table.note}
        </figcaption>
      )}
    </figure>
  )
}
