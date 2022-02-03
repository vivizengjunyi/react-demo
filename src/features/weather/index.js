import { useSelector } from "react-redux";
export default function Weather(){
    const weatherData = useSelector(state => state.weather.weatherData);
    return <div>
        {
            weatherData.map(data => <div key={data.id}>
                <h3>{data.name}</h3>
                <p>{data.weather[0].description}</p>
                <p>{data.main.temp}</p>
            </div>)
        }
    </div>
}