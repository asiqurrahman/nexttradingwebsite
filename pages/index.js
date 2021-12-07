import Head from 'next/head'
import Image from 'next/image'
import Navcover from '../components/Navcover'
import Siteexplanation from '../components/Siteexplanation'

export default function Home() {
  return (
    <div>
        <Navcover />
        <Siteexplanation />
    </div>
  )
}
