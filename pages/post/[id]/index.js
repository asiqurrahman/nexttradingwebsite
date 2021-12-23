import { useRouter } from 'next/router'
import React, {useContext, useState, useEffect} from 'react'
import Singlepostimages from '../../../components/Singlepost/Singlepostimages'
import Singlepostdescription from '../../../components/Singlepost/Singlepostdescription'
import Googlemaps from '../../../components/Googlemaps'

const Index = ({data}) => {

    const router = useRouter()

    const [userdata, setUserdata] = useState()
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const userid = data?.author

    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    useEffect( async () => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
        setLat(separator(data.lat))
        setLng(separator(data.lng))
    }, [data])

    function sendTo(id){
        router.push('/profile/' + id)
    }

    return (
        <div className="postpreview">
            <div className="postpreviewheader">
                <div className="postpreviewheaderinner" onClick={() => sendTo(data?.author)}>
                    <img src={data?.author_avatar}/>
                    <h1>{data?.author_username}</h1>
                </div>
            </div>
            <hr />
            <Singlepostimages data={data}/>
            <hr />
            <Singlepostdescription data={data}/>
            <div className="singlemaps">
                <Googlemaps lat={lat} lng={lng}/>
            </div>
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
