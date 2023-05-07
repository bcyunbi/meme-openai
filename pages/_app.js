import Link from 'next/link'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className='nav'>
        <Link href='/'>Text</Link>
        <Link href='/art'>Art</Link>
      </div>
      <Component {...pageProps} />
    </>
  )
}
