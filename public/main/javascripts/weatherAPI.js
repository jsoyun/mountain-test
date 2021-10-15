//////내위치정보 가져오기
function getCoords() {
    const loadedCoords = localStorage.getItem("coords");
    if (loadedCoords === null) {
        navigator.geolocation.getCurrentPosition(GetSucces, GetError);
    } else {
        const latitude = JSON.parse(loadedCoords).latitude;
        const longitude = JSON.parse(loadedCoords).longitude;
        WeatherAPI(latitude, longitude)
    }
}

function GetSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    localStorage.setItem("coords", JSON.stringify(coordsObj));
    console.log(JSON.stringify(coordsObj));
    WeatherAPI(latitude, longitude)
}

function GetError() {
    console.log("Can't access geo location");
}
//////날씨가져오기
async function WeatherAPI(lat, lon) {
    const API_KEY = "31509aa101a3c82af7f1d764258072ec";
    const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang={kr}`
    );
    const WeatherAPIData = result.data;
    const cityName = WeatherAPIData.name;
    const temp = WeatherAPIData.main.temp;
    const weather = WeatherAPIData.weather[0].main;
    const weatherIconsrc = `https://openweathermap.org/img/wn/${WeatherAPIData.weather[0].icon}@2x.png`;
    document.getElementById("weather").innerHTML = weather + " , " + `${temp}&#176;C`;
    document.getElementById("weather-img").setAttribute("src", weatherIconsrc);

}
getCoords()