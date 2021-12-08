const Singlepostimages = ({data}) => {
    return (
        <div className="singepostimages">
            <img src={data?.trade_image} />
            <img src={data?.wanted_image} />
        </div>
    )
}

export default Singlepostimages
