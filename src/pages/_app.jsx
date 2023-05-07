import Link from 'next/link'
import '../styles/global.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [path, setPath] = useState('/')
  useEffect(() => {
    setPath(router.asPath)
  }, [router])
  return (
    <>
      <div className='nav'>
        {links.map((link) => {
          return (
            <Link key={link.href} href={link.href}>
              <span className={path === link.href ? 'link-active' : ''}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
      <Component {...pageProps} />
    </>
  )
}

const links = [
  { href: '/', label: 'Text' },
  { href: '/paint', label: 'paint' },
]
