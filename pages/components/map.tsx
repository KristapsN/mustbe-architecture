import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

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
    googleMapsApiKey: "AIzaSyDxq0hhH6IQfnzKMCCjnUUSTc2b0s_uzG8"
  })



  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{zoomControl: false, mapTypeControl: false, streetViewControl: false, mapId: '7347b8bb47bd883b'}}
      >
        <Marker position={{ lat: 56.9515693, lng: 24.1074527 }} />
      </GoogleMap>
  ) : <></>
}

export default React.memo(ContactMap)