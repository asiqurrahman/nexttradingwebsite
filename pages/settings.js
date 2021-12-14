import { route } from 'next/dist/server/router'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import Googleplaces from '../components/Googleplaces'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Googlemaps from '../components/Googlemaps'
import Loading from '../components/Loading'
const Settings = () => {
    let {user} = useContext(AuthContext)
    const [userdata, setUserdata] = useState()
    const [edit, setEdit] = useState(false)
    const [picture, setPicture] = useState(null);
    const [tradedimage, setTradedimage] = useState(null);
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const userid = user?.user_id
    const usercity = userdata?.city

    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    useEffect(async() => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
        setLat(separator(data.lat))
        setLng(separator(data.lng))
    }, [userid])


    const changeProfile = async (e) => {
        e.preventDefault();
        const changepic = document.getElementById('changepic');
        let formData = new FormData()
        formData.append("avatar", changepic.files[0])
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/update/${userid}/`, {
            method: 'PATCH',
            body: formData
        })
    }

    const onChangePicture = e => {
        if (e.target.files[0]) {
          setPicture(e.target.files[0]);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setTradedimage(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

    const getLocation = async (e,) => {
        e.preventDefault()
        const address = e.target.locationval.value
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsJLWRgoDZj4pMuIej-7y_AMiGbr3LlDI`, {
            method:'POST'
        })
        const data = await response.json()
        console.log(JSON.stringify(data))
        updateLocation(e, data)
    }

    const updateLocation = async (e , data) => {
        e.preventDefault();
        let maincity;
        try {
            const city = data.results[0].address_components.filter(ac=>~ac.types.indexOf('locality'))[0].long_name
            maincity = city
        } catch(err) {
            const city = data.results[0].address_components.filter(ac=>~ac.types.indexOf('sublocality'))[0].long_name
            maincity = city
        }
        const state = data.results[0].address_components.filter(ac=>~ac.types.indexOf('administrative_area_level_1'))[0].long_name
        const zipcode = data.results[0].address_components.filter(ac=>~ac.types.indexOf('postal_code'))[0].long_name
        console.log(JSON.stringify(data))
        const lat = data.results[0].geometry.location.lat
        const long = data.results[0].geometry.location.lng
        const citystate = maincity + ", " + state
        let formData = new FormData()
        formData.append("lat", lat)
        formData.append("lng", long)
        formData.append("city", citystate)
        formData.append("zipcode", zipcode)
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/update/${userid}/`, {
            method: 'PATCH',
            body: formData
        })
        if(response.ok) {
            location.reload();
        }
    }

    const allFunc = (e) => {
        getLocation(e)
        changeProfile(e)
    }

    return (
        <div className="usersettings">
            <form className="settingscontainer2" onSubmit={allFunc}>
                <div className="settingscontainer">
                    <div className="settingsimg">
                        <img src={tradedimage ? tradedimage : userdata?.avatar} />
                        <p className="settingsusername">{userdata?.username || <Skeleton />}</p>
                        <h4>{userdata?.city || <Skeleton />}</h4>
                        <div>
                            {edit &&
                            <div> 
                                <p>Change Profile Image:</p>
                                <input type="file"  accept="image/*" name="tradeimage" id="changepic" onChange={onChangePicture} />
                            </div>
                            }
                        </div>
                    </div>
                    <div className="settinsuseinfo">
                        <p>Email:</p>
                        <p className="userp">{userdata?.email || <Skeleton count={2}/>}</p>
                        <p>Username:</p>
                        <p className="userp">{userdata?.username || <Skeleton count={2}/>}</p>
                        <p>Location:</p>
                        {edit ? 
                        <div>
                             <p>Enter zipcode or address</p>
                            {/* <input type="text" className="editinput" id="locationval" required/> */}
                            <Googleplaces />
                        </div>
                        :
                        <p className="userp">{usercity ? usercity : "Not Set. Edit profile to set location" }</p>
                        }
                    </div>
                </div>
                <div className="googlemapscontainer">
                    <Googlemaps lat={lat} lng={lng}/>
                </div>
                {edit ? 
                <div className="settingcancelsubmit">
                    <div className="editbutton">
                        <p onClick={() => setEdit(!edit)}>Cancel</p>
                    </div>
                     <div className="postsubmit">
                        <input type="submit" value="Save" />
                     </div>
                </div>
                :
                <div className="editbutton">
                    <p onClick={() => setEdit(!edit)}>Edit Profile</p>
                </div>
                }
            </form>
        </div>
    )
}

export default Settings


