import Image from 'next/image'
import Link from 'next/link'

const Navcover = () => {
    return (
        <div className="navcover">
            <div id="navcoveritem">
                <div>
                    <h1>Post Find Trade</h1>
                </div>
                <div>
                    <p>Swap Anything For Everything. A community built for trading.</p>
                </div>
                <div className="navcoverloginbutton">
                    <div className="navlogin" id="navcoverlogin">
                        <Link href="/login">
                            <p className="navlogintext">Login/Signup</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="navcoverimage" id="navcoveritem">
                <img src="trade.png" />
            </div>
            <div>
                <img id="wave" src="wave.png" />
            </div>
        </div>
    )
}

export default Navcover
