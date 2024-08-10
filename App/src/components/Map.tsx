import { Map as GMAP, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

const Map = () => {
    const API_key = "AIzaSyBuwtpB9HS2fpkBMsrNQ-nWISWqawdkeZs";
    return <GMAP
    defaultZoom={13}
    defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
    onCameraChanged={ (ev: MapCameraChangedEvent) =>
      console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
    }>
</GMAP>
};

export default Map;