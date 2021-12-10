import React, {useContext, useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const Allpost = ({data}) => { 

    const router = useRouter()

    const [something, setSomething] = useState()

   const getUser = async (id) => {
       let url = `https://asiqursswap.herokuapp.com/api/user/${id}/`
       const response = await fetch(url)
       const data = await response.json()
       const returnedurl = data.avatar
       const returnedurl2 = JSON.stringify(returnedurl)
       return returnedurl2
   }

   console.log(getUser(1))
    
    function sendTo(id){
        router.push('/post/' + id)
    }

    return (
        <div className="allpost">
             {data?.map((data) => (
                <div className="allpostsingle" key={data.id} onClick={() => sendTo(data.id)}>
                    <div className="allpostheader">
                        <img src="https://asiqstestbucket.s3.amazonaws.com/default.jpg"/>
                        <p>Asiqur</p>
                    </div>
                    <div className="allpostimages">
                        <div className="allpostdiv">
                            <p>{data.trade}</p>
                            <img src={data.trade_image} />
                        </div>
                        <div>
                            <img src="swap.png" className="swapimage"/>
                        </div>
                        <div className="allpostdiv">
                            <p>{data.wanted}</p>
                            <img src={data.wanted_image} />
                        </div>
                    </div>
                </div>
              ))}
        </div>
    )
}

export default Allpost
