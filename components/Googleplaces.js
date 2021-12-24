import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import AuthContext from "../context/AuthContext";
import React, {useContext, useEffect} from 'react'

const Googleplaces = () => {

    let {user} = useContext(AuthContext)

    const userid = user?.user_id

    const [prepopulate, setPrePopulate] = React.useState()

    useEffect(async() => {
        const response = await fetch(`https://asiqursswap.herokuapp.com/api/user/${userid}/`)
        const data = await response.json()
        setPrePopulate(data.original_location)
    }, [userid])

    const handleChange = (event) => {
        setPrePopulate(event.target.value)
    }


    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });
  
    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
    };

    // value={prepopulate}
    // onChange={handleChange}

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({ placeholder: "Type address" })} name="locationval" type="text" className="editinput" id="locationval" required/>
                    <div className="google">
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map(suggestion => {
                        
                        return (
                            <div className="droping" {...getSuggestionItemProps(suggestion)} key={suggestion.id}>
                                {suggestion.description}
                            </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default Googleplaces
