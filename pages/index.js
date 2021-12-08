import Head from 'next/head'
import Image from 'next/image'
import Navcover from '../components/Navcover'
import Siteexplanation from '../components/SiteExplanation'
import Allpost from '../components/Allpost'

export default function Home({data}) {
  return (
    <div>
        <Navcover />
        <Siteexplanation />
        <Allpost data={data}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('https://asiqursswap.herokuapp.com/api/post/')
  const data = await response.json()
  return {
      props: {data}
  }
}