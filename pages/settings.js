import { route } from 'next/dist/server/router'
import React, {useContext, useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'

const Settings = () => {
    let {user} = useContext(AuthContext)
    const [userdata, setUserdata] = useState()
    const [edit, setEdit] = useState(false)
    const [picture, setPicture] = useState(null);
    const [tradedimage, setTradedimage] = useState(null);

    const userid = user?.user_id
    const usercity = userdata?.city
    useEffect(async() => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setUserdata(data)
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

        if(response.ok) {
            console.log('wow')
        }
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
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsJLWRgoDZj4pMuIej-7y_AMiGbr3LlDI&result_type=locality`, {
            method:'POST'
        })
        const data = await response.json()
        updateLocation(e, data)
    }

    const updateLocation = async (e , data) => {
        e.preventDefault();
        const city = data.results[0].address_components[3].long_name
        const state = data.results[0].address_components[5].long_name
        const zipcode = data.results[0].address_components[7].long_name
        console.log(JSON.stringify(data))
        const lat = data.results[0].geometry.location.lat
        const long = data.results[0].geometry.location.lng
        const citystate = city + ", " + state
        let formData = new FormData()
        formData.append("lat", lat)
        formData.append("lng", long)
        formData.append("city", citystate)
        formData.append("zipcode", zipcode)
        const response = await fetch(`https://asiqursswap.herokuapp.com/user/update/${userid}/`, {
            method: 'PATCH',
            body: formData
        })
        if(response.ok) {
            console.log('wow')
        }
    }

    const allFunc = (e) => {
        const changepic = document.getElementById('changepic');
        if(changepic) {
          changeProfile(e)
          updateLocation(e)
        } else {
            updateLocation(e)
        }
    }

    return (
        <div className="usersettings">
            <form className="settingscontainer2" onSubmit={allFunc}>
                <div className="settingscontainer">
                    <div className="settingsimg">
                        <img src={tradedimage ? tradedimage : userdata?.avatar} />
                        <p className="settingsusername">{userdata?.username}</p>
                        <h4>{userdata?.city}</h4>
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
                        <p className="userp">{userdata?.email}</p>
                        <p>Username:</p>
                        <p className="userp">{userdata?.username}</p>
                        <p>Location:</p>
                        {edit ? 
                        <div>
                             <p>Enter zipcode or address</p>
                            <input type="text" className="editinput" id="locationval" required/>
                        </div>
                        :
                        <p className="userp">{usercity ? usercity : "Not Set. Edit profile to set Location" }</p>
                        }
                    </div>
                </div>
                {edit ? 
                <div className="postsubmit">
                <input type="submit" value="Save" />
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


