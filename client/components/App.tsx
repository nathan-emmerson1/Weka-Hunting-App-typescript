import { useState } from 'react'
import MapTiler from './Map'
import Nav from './Nav'
import Windy from './Windy'
import { MapController } from '@maptiler/geocoding-control/types'

function App() {
  const [showMapTiler, setShowMapTiler] = useState(true)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [mapController, setMapController] = useState<MapController | null>(null)

  return (
    <div className="App">
      <Nav mapController={mapController} />
      <button onClick={() => setShowMapTiler(!showMapTiler)}>
        {showMapTiler ? 'Show Windy' : 'Show MapTiler'}
      </button>
      {showMapTiler ? (
        <MapTiler
          setCoordinates={setCoordinates}
          initialCoordinates={coordinates}
          setMapController={setMapController}
        />
      ) : (
        <Windy coordinates={coordinates} />
      )}
    </div>
  )
}

export default App
