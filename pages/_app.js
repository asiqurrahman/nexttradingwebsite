import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.css'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', () => Nprogress.start())
Router.events.on('routeChangeComplete', () => Nprogress.done())
Router.events.on('routeChangeError', () => Nprogress.done())

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
