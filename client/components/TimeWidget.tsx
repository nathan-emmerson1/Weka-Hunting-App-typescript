import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '../../models/WeatherData'
import getWeatherData from '../apis/TimeWidgetData'

interface TimeWidgetProps {
  coordinates: { lat: number; lng: number } | null
}

function TimeWidget({ coordinates }: TimeWidgetProps) {
  const { lat, lng } = coordinates ?? { lat: 38.66, lng: 178.01 } // Default to dummy coordinates

  const {
    data: weather,
    isLoading,
    isError,
  } = useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lng],
    queryFn: () => {
      if (coordinates) {
        return getWeatherData(lat, lng)
      } else {
        return Promise.reject(new Error('Coordinates not available'))
      }
    },
    enabled: !!coordinates,
  })

  if (isError) {
    return <div>There was an error fetching the weather data.</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!weather) {
    return <div>No weather data available.</div>
  }

  return (
    <div className="time-widget">
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.temp}°C</p>
      <p>Description: {weather.description}</p>
      <p>Sunrise: {weather.sunrise}</p>
      <p>Sunset: {weather.sunset}</p>
      <p>Current Time: {weather.currentTime}</p>
    </div>
  )
}

export default TimeWidget
