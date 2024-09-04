import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '../../models/WeatherData'
import getWeatherData from '../apis/TimeWidgetData'
import { useEffect } from 'react'

interface TimeWidgetProps {
  coordinates: { lat: number; lng: number } | null
}

function TimeWidget({ coordinates }: TimeWidgetProps) {
  const { lat, lng } = coordinates ?? { lat: 38.66, lng: 178.01 }

  const {
    data: weather,
    isLoading,
    isError,
    refetch,
  } = useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lng],
    queryFn: () => getWeatherData(lat, lng),
    enabled: !!coordinates,
  })

  useEffect(() => {
    if (coordinates) {
      refetch()
    }
  }, [coordinates, refetch])

  if (isError) {
    return <div>There was an error fetching the weather data.</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!weather) {
    return <div>Loading...</div>
  }

  console.log(weather)

  return (
    <div className="time-widget-container">
      <h1 className="time-widget-title">Weather in {weather.name}</h1>
      <p className="time-widget-temp">Temperature: {weather.temp}°C</p>
      <p className="time-widget-description">
        Description: {weather.description}
      </p>
      <div className="time-widget-sun-info">
        <p>Sunrise: {weather.sunrise}</p>
        <p>Sunset: {weather.sunset}</p>
      </div>
      <p className="time-widget-current-time">
        Current Time: {weather.currentTime}
      </p>
    </div>
  )
}

export default TimeWidget
