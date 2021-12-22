import Image from 'next/image'
import Parser from 'html-react-parser';

const Singlepostdescription = ({data}) => {

    console.log(Parser(data?.description))
    return (
        <div className="singlepostdescription">
            <div className="singledescription">
                <p>Description</p>
                <div>{Parser(data?.description)}</div>
            </div>
        </div>
    )
}

export default Singlepostdescription
