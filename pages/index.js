import Head from 'next/head'
import Image from 'next/image'
import AuthContext from '../context/AuthContext'
import Navcover from '../components/Navcover'
import Siteexplanation from '../components/SiteExplanation'
import Allpost from '../components/Allpost'
import React, {useContext, useState} from 'react'
import Loading from '../components/Loading'


export default function Home({data}) {

  let {user} = useContext(AuthContext)

  return (
    <div>
      {!user ?
      <div>
        <Navcover />
        <Siteexplanation />
        <hr />
      </div>
      :
        <Allpost data={data}/>
      }
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('https://asiqursswap.herokuapp.com/api/post/')
  // const response = await fetch('http://127.0.0.1:8000/api/post/')
  const data = await response.json()
  return {
      props: {data}
  }
}