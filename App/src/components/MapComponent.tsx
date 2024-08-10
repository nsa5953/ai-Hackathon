// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, DirectionsResult } from '@react-google-maps/api';

// const MapComponent: React.FC = () => {
//   const [directionsResponse, setDirectionsResponse] = useState<DirectionsResult | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const destination = "Your home address or coordinates"; // e.g., "1 Infinite Loop, Cupertino, CA"

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setDirectionsResponse({
//             routes: [],
//             request: {
//               origin: { lat: latitude, lng: longitude },
//               destination,
//               travelMode: 'DRIVING',
//             } as any,
//             status: 'OK',
//             geocoded_waypoints: [],
//           });
//         },
//         (err) => setError(err.message)
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, [destination]);

//   return ( <></>
//     // <LoadScript googleMapsApiKey="AIzaSyBuwtpB9HS2fpkBMsrNQ-nWISWqawdkeZs">
//     //   <GoogleMap
//     //     mapContainerStyle={{ width: '100%', height: '400px' }}
//     //     zoom={7}
//     //     center={{ lat: 37.7749, lng: -122.4194 }} // Default center (San Francisco)
//     //   >
//     //     {directionsResponse && directionsResponse.request && (
//     //       <DirectionsService
//     //         options={{
//     //           destination: directionsResponse.request.destination,
//     //           origin: directionsResponse.request.origin,
//     //           travelMode: 'DRIVING',
//     //         }}
//     //         callback={(result, status) => {
//     //           if (status === 'OK' && result) {
//     //             setDirectionsResponse(result);
//     //           } else {
//     //             setError('Error fetching directions');
//     //           }
//     //         }}
//     //       />
//     //     )}
//     //     {directionsResponse && (
//     //       <DirectionsRenderer
//     //         directions={directionsResponse}
//     //       />
//     //     )}
//     //   </GoogleMap>
//     //   {error && <div>{error}</div>}
//     //   </LoadScript>
//   );
// };

// export default MapComponent;

import React, { useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, DirectionsRenderer, LoadScript  } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 18.513850,
  lng: 73.924454
};

function MapComponent() {
  const [directions, setDirections] = React.useState<any>(null);

  const onLoad = useCallback(function callback(map:any) {
    const directionsService: any = new google.maps.DirectionsService();

    const request = {
      origin: 'Chicago, IL',
      destination: 'Los Angeles, CA',
      travelMode: 'DRIVING'
    };

    const origin = { lat: 40.756795, lng: -73.954298 };
    const destination = { lat: 41.756795, lng: -78.954298 };

    // directionsService.route({origin: origin,
    //   destination: destination,
    //   travelMode: google.maps.TravelMode.DRIVING}, function(result:any, status:any) {
    //   if (status === 'OK') {
    //     setDirections(result);
    //   }
    // });

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result: any, status:any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    )
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuwtpB9HS2fpkBMsrNQ-nWISWqawdkeZs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        onLoad={onLoad}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);