import { Head } from 'vite-react-ssg'
import { absUrl, site } from '../site.config'

type SeoProps = {
  /** Rendered <title>. Keep under ~60 characters as it appears on screen. */
  title: string
  description: string
  /** Route path, e.g. "/refinishing/". Used for the canonical URL. */
  path: string
  /** Absolute or root-relative image for social cards. */
  image?: string
  /** JSON-LD nodes for this page. */
  schema?: Record<string, unknown>[]
  noindex?: boolean
}

export default function Seo({
  title,
  description,
  path,
  image = '/media/hero.jpg',
  schema = [],
  noindex = false,
}: SeoProps) {
  const canonical = absUrl(path)
  const ogImage = image.startsWith('http') ? image : absUrl(image)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema.map((node, i) => (
        <script key={i} type="application/ld+json">
          {/* JSON.stringify escapes nothing dangerous here because every value
              is authored by us, but "</script>" inside a string would still
              break parsing — so close-tag sequences are neutralised. */}
          {JSON.stringify(node).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Head>
  )
}
