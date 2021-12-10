import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Singlepostimages from '../../../components/Singlepost/Singlepostimages'
import Singlepostdescription from '../../../components/Singlepost/Singlepostdescription'
const Index = ({data}) => {
    const [userdata, setUserdata] = useState()
    const userid = data?.author
    useEffect( async () => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
    }, [data])
    return (
        <div className="postpreview">
            <div className="postpreviewheader">
                <img src={userdata?.avatar} />
                <h1>{userdata?.username}</h1>
            </div>
            <hr />
            <Singlepostimages data={data}/>
            <hr />
            <Singlepostdescription data={data}/>
        </div>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://asiqursswap.herokuapp.com/api/post/${context.params.id}/`)
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}
