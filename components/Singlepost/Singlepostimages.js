import Image from 'next/image'

const Singlepostimages = ({data}) => {
    return (
        <div className="singelpostimages">
            <div>
                <p>I would like to trade my...</p>
                <h1>{data?.trade}</h1>
                <img src={data?.trade_image} />
            </div>
            <div>
                <img src="../swap.png" className="swapimage"/>
            </div>
            <div>
                <p>in exchange for...</p>
                <h1>{data?.wanted}</h1>
                <img src={data?.wanted_image} />
            </div>
        </div>
    )
}

export default Singlepostimages