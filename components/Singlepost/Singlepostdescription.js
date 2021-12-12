import Image from 'next/image'

const Singlepostdescription = ({data}) => {
    return (
        <div className="singlepostdescription">
            <div className="singledescription">
                <p>Description</p>
                <h1>{data?.trade_description}</h1>
            </div>
            <div>
                <img src="../swap.png" className="swapimage swapimage2"/>
            </div>
            <div className="singledescription">
                <p>Description</p>
                <h1>{data?.wanted_description}</h1>
            </div>
        </div>
    )
}

export default Singlepostdescription
