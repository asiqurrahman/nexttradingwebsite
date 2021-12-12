import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const Googlemaps = ({lat, lng}) => {
    
    return (
        <div>
            {lng && 
            <div>
                <Map
                    className="googlemaps"
                    google={google}
                    zoom={13}
                    dragable={false}
                    initialCenter={{ lat: lat, lng: lng}}>
                    <Marker position={{ lat: lat, lng: lng}} />
                </Map>
            </div>
            }
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsJLWRgoDZj4pMuIej-7y_AMiGbr3LlDI'
  })(Googlemaps);
