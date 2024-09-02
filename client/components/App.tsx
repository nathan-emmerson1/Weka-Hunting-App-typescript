import { useState } from 'react'
import MapTiler from './Map'
import Nav from './Nav'
import Windy from './Windy'

function App() {
  const [showMapTiler, setShowMapTiler] = useState(true)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)
  return (
    <div className="App">
      <Nav />
      <button onClick={() => setShowMapTiler(!showMapTiler)}>
        {showMapTiler ? 'Show Windy' : 'Show MapTiler'}
      </button>
      {showMapTiler ? (
        <MapTiler
          setCoordinates={setCoordinates}
          initialCoordinates={coordinates}
        />
      ) : (
        <Windy coordinates={coordinates} />
      )}
    </div>
  )
}

export default App
