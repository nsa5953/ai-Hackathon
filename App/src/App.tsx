import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import Hack from "./features/hack/Hack"
import "./App.css"
import Dashboard from "./components/dashboard"
import {APIProvider, MapCameraChangedEvent, Map as GMAP} from '@vis.gl/react-google-maps';
import MapComponent from "./components/MapComponent"

function App() {
  const API_key = "AIzaSyBuwtpB9HS2fpkBMsrNQ-nWISWqawdkeZs";
  return (
    <>
    <APIProvider apiKey={API_key} onLoad={() => console.log('Maps API has loaded.')}>
      <div className="App">    
        <Dashboard />
      </div>
      <GMAP
        defaultZoom={13}
        defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }>
      </GMAP>
    </APIProvider>
{/*     
    <MapComponent/> */}
    </>


  )
}

export default App
