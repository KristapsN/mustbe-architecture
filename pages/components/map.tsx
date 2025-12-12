import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapStyles from '../../utils/mapStyles';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 56.95149304884532,
  lng: 24.108021741919345
};

const ContactMap = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY ?? '',
    language: 'lv'
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          zoomControl: false,
          mapTypeControl: false, 
          streetViewControl: false, 
          // to use custom styles mapId should be disabled
          // mapId: process.env.MAP_ID,
          styles: mapStyles
        }}
      >
        <Marker position={{ lat: 56.95149304884532, lng: 24.108021741919345 }} />
      </GoogleMap>
  ) : <>Loading...</>
}

export default ContactMap
