import  { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    windyInit: (
      options: Record<string, any>,
      callback: (windyAPI: any) => void
    ) => void
  }
  const L: any
}

interface WindyProps {
  coordinates: { lat: number; lng: number } | null
}

function Windy({ coordinates }: WindyProps) {
  const windyRef = useRef(null)
  const [windyAPI, setWindyAPI] = useState<any>(null)

  useEffect(() => {
    if (!windyRef.current) return

    // Windy API options
    const options = {
      key: 'KWp1v5jd8qR6BpQwSozw9F2oGVcUmhK6', // REPLACE WITH YOUR KEY !!!
      verbose: true,
      lat: coordinates?.lat ?? -38.6,
      lon: coordinates?.lng ?? 178.0,
      zoom: 11,
    }

    // Initialize Windy API
    window.windyInit(options, (windyApi) => {
      setWindyAPI(windyApi)

      // Example of using Windy's Leaflet instance
    })
  }, [])

  useEffect(() => {
    if (windyAPI) {
      const { map } = windyAPI
      map.setView([coordinates!.lat, coordinates!.lng], 11)
    }
  }, [coordinates, windyAPI])

  return <div ref={windyRef} className="windy"></div>
}
export default Windy
