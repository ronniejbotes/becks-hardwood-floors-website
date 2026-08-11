import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { services } from './content/services'
import './index.css'

/**
 * Routes.
 *
 * Paths carry a trailing slash and `dirStyle: 'nested'` in vite.config.ts emits
 * each one as its own directory + index.html. That keeps the canonical URL, the
 * sitemap entry and the file that Apache serves all identical, with no rewrite
 * rules needed on Hostinger.
 *
 * URLs were settled BEFORE the first sitemap submission on purpose. Renaming a
 * URL Google has already indexed costs authority the site has not earned yet;
 * renaming one it has never fetched is free.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, Component: Home },
      ...services.map((service) => ({
        path: service.path.replace(/^\/|\/$/g, ''),
        element: <ServicePage service={service} />,
      })),
      { path: 'gallery', Component: Gallery },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      // Prerendered so Apache has a real file to serve for ErrorDocument 404.
      // The post-build script copies dist/404/index.html to dist/404.html.
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
]
