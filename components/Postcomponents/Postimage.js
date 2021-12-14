import React, { useState } from "react";
import { useRouter } from 'next/router'

const Postimage = () => {
    const router = useRouter()

    const [picture, setPicture] = useState(null);
    const [tradedimage, setTradedimage] = useState(null);

    const [picture2, setPicture2] = useState(null);
    const [wantedimage, setWantedimage] = useState(null);

    const [tradedimagestate, setTradedimagestate] = useState(true);
    const [wantedimagestate, setWantedimagestate] = useState(true);

    const onChangePicture = e => {
        if (e.target.files[0]) {
          setPicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setTradedimage(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
        setTradedimagestate(false)
      };

    const onChangePicture2 = e => {
        if (e.target.files[0]) {
          setPicture2(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setWantedimage(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
        setWantedimagestate(false)
      };

    return (
        <div>
            <div className="posttitle">
                <div>
                    <label>What do you have to trade?</label>
                    <br />
                    <input type="text" placeholder="e.g - PS5" name="trade" required/>
                </div>
                <div>
                    <label>What would you like to trade for?</label>
                    <br />
                    <input type="text" placeholder="e.g - Xbox Series X" name="wanted" required/>
                </div>
            </div>
            <div className="postimages">
                <div className="tradedimage">
                    <label>Add an image of your item</label>
                    <br />
                    <input type="file"  accept="image/*" name="tradeimage" id="tradeimagepic" onChange={onChangePicture} required/>
                    
                    <div className="previewProfilePic">
                        <img className="playerProfilePic_home_tile" src={tradedimage} />
                    </div>
                </div>
                <div className="wantedimage">
                  <label>Add an image of what you want</label>
                    <br />
                    <input type="file"  accept="image/*" name="wantedimage" id="wantedimagepic" onChange={onChangePicture2} required/>
                    
                    <div className="previewProfilePic">
                        <img className="playerProfilePic_home_tile" src={wantedimage} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Postimage
