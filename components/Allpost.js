import React, {useContext, useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const Allpost = ({data}) => { 

    const router = useRouter()

    function sendTo(id){
        router.push('/post/' + id)
    }

    return (
        <div className="allpost">
             {data?.map((data) => (
                <div className="allpostsingle" key={data.id} onClick={() => sendTo(data.id)}>
                    <div className="allpostheader">
                        <img src={data?.author_avatar}/>
                        <p>{data?.author_username}</p>
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
