const Singlepostdescription = ({data}) => {
    return (
        <div className="singlepostdescription">
            <div>
                <p>Description</p>
                <h1>{data?.trade_description}</h1>
            </div>
            <div>
                <p>Description</p>
                <h1>{data?.wanted_description}</h1>
            </div>
        </div>
    )
}

export default Singlepostdescription
