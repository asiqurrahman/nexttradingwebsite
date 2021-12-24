import Image from 'next/image'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'

const Index = ({data}) => {

    const router = useRouter()

    function sendTo(id){
        router.push('/post/' + id)
    }
    
    return (
        <div>
            {data[0] ? 
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
                                    <img src="../swap.png" className="swapimage"/>
                                </div>
                                <div className="allpostdiv">
                                    <p>{data.wanted}</p>
                                    <img src={data.wanted_image} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            :
              <div className="allpost">
                  <div>
                    <h3>No post could be found</h3>
                  </div>
               </div>
            }
        </div>
    )
}

export default Index

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://asiqursswap.herokuapp.com/api/search/${context.params.id}/`)
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}
