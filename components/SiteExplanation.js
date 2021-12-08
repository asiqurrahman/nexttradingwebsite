import Image from 'next/image'
import Link from 'next/link'

const Siteexplanation = () => {
    return (
        <div className="siteexplanation">
            <div className="explanation">
                <div id="explanationitem">
                    <p>Post an item you would like to trade along with an item you would like to trade for. </p>
                </div>
                <div id="explanationitem">
                    <img src="post.png" />
                </div>
            </div>
            <div className="explanation" id='middleexplanation'>
                <div id="explanationitem">
                    <img className="rotate" src="neural.png" />
                </div>
                <div id="explanationitem">
                    <p>Sit back and relax, our algoritham will automatically notify you when an item you&apos;re looking for is posted.</p>
                </div>
            </div>
            <div className="explanation">
                 <div id="explanationitem">
                    <p>Once you find the item your looking for, negotiate and make a trade</p>
                </div>
                <div id="explanationitem">
                    <img src="handshake.png" />
                </div>
            </div>
        </div>
    )
}

export default Siteexplanation
