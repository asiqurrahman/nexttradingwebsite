import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
const Googleplaces = () => {
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

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input {...getInputProps({ placeholder: "Type address" })} type="text" className="editinput" id="locationval" required/>
                    <div className="google">
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map(suggestion => {
                        
                        return (
                            <div className="droping" {...getSuggestionItemProps(suggestion)} key={suggestion.id}>
                                {suggestion.description}
                                <hr />
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
