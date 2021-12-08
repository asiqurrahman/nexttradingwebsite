import React, {useContext, useState, useEffect} from 'react'

const Allpost = ({data}) => { 

//     const [something, setsomething] = useState()

//    const getUser = async (id) => {
//        let url = `http://127.0.0.1:8000/api/user/${id}/`
//        const response = await fetch(url)
//        const data = await response.json()
//        const returnedurl = data.avatar
//        return returnedurl
//    }

    return (
        <div className="allpost">
             {data?.map((data) => (
                <div className="allpostsingle">
                    <div className="allpostheader">
                        <img src="https://asiqstestbucket.s3.amazonaws.com/default.jpg" />
                        <p>Asiqur</p>
                    </div>
                    <div className="allpostimages">
                        <div>
                            <p>{data.trade}</p>
                            <img src={data.trade_image} />
                        </div>
                        <div>
                            <img src="swap.png" className="swapimage"/>
                        </div>
                        <div>
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
