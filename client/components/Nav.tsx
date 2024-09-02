import { GeocodingControl } from '@maptiler/geocoding-control/react'
import type { MapController } from '@maptiler/geocoding-control/types'
import '@maptiler/geocoding-control/style.css'
import logo from '../../images/Logo.png'

interface NavProps {
  mapController: MapController | null
}

function Nav({ mapController }: NavProps) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="weka maps logo"></img>
      </div>
      <div className="navbar-search">
        {mapController && (
          <GeocodingControl
            apiKey={'aRttS83mbQ8qdXahgTPf'}
            mapController={mapController}
          />
        )}
      </div>
    </nav>
  )
}

export default Nav
