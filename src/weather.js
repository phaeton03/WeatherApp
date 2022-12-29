import {getLocation, getLocationByAddress} from './geo.js'
import {drawMap} from './weatherMap.js'

const weatherKey = '6075b4aa58b2a8c37abcb76de0cd3c35';
const weatherUrl = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`;
const CITY_STORAGE_LENGTH = 10;

document.addEventListener('DOMContentLoaded', function () {

    const button = document.querySelector(".button");
    const input = document.querySelector(".inputCity");

    button.addEventListener("click", function () {
        console.log(input.value);
        getWeatherInCity(input.value);
    });
    if (!input.value) {
        getWeather();
    }
});


export async function getWeather() {

    const location = await getLocation();
    const response = await fetch(weatherUrl(location.latitude, location.longitude));

    const result = await response.json();
    const divWeather = document.querySelector('.weather');

    drawMap(location.latitude, location.longitude);

    divWeather.innerHTML = `Current city is ${result.name}.<br><br>Temperature is ${result.main.temp} C`;
}

export async function getWeatherInCity(city) {
    console.log(city);
    if (!city) {
        return;
    }
    console.log('getWeatherInCity');
    const location = await getLocationByAddress(city);
    console.log(location);
    const response = await fetch(weatherUrl(location.latitude, location.longitude));
    console.log(response);
    const result = await response.json();
    console.log(result);
    const divWeather = document.querySelector('.weather');

    setCityToLocalStorage(city);

    drawMap(location.latitude, location.longitude);
    divWeather.innerHTML = `The city is ${result.name}.<br><br>Temperature is ${result.main.temp} C`;
}

export function setCityToLocalStorage(city) {
    let arrCity = [];
    const cityStorage = window.localStorage.getItem('city');

    if (!cityStorage) {
        arrCity.unshift(city);
        window.localStorage.setItem('city', JSON.stringify(arrCity));
    } else {
        arrCity = JSON.parse(cityStorage);
        if (!arrCity.includes(city)) {
            arrCity.unshift(city);
        }
        clearCityLocalStorageAboveThreshold();
        window.localStorage.setItem('city', JSON.stringify(arrCity));
    }
}

export function clearCityLocalStorageAboveThreshold() {
    const cityStorage = window.localStorage.getItem('city');

    if (cityStorage && JSON.parse(cityStorage).length > CITY_STORAGE_LENGTH) {
        JSON.parse(cityStorage).pop();
    }
}

