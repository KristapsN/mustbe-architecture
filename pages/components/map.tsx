import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 56.9515693,
  lng: 24.1074527
};

const ContactMap = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY ?? ''
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{zoomControl: false, mapTypeControl: false, streetViewControl: false, mapId: process.env.MAP_ID}}
      >
        <Marker position={{ lat: 56.9515693, lng: 24.1074527 }} />
      </GoogleMap>
  ) : <>Loading...</>
}

export default ContactMap
