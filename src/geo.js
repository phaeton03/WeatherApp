import {clearCityLocalStorageAboveThreshold, getWeather, getWeatherInCity, setCityToLocalStorage} from "./weather.js";

const key = "861d752669853754f1c06aea0f8c3adf52d14278";
const geoKey = '00abd8eb67ad48caad2c12048f2161c6';

const url = `https://api.getgeoapi.com/v2/ip/check?api_key=${key}&format=json`;
const urlGeoAddress = (address) => `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${geoKey}`;


export async function getLocation() {
    const response = await fetch(url);

    const result = await response.json();

    return {
        latitude: result.location.latitude,
        longitude: result.location.longitude
    };
}

export async function getLocationByAddress(address) {
    const response = await fetch(urlGeoAddress(address));

    const result = await response.json();

    const lat = result.features[0].properties.lat;
    const lon = result.features[0].properties.lon;

    return {
        latitude: lat,
        longitude: lon
    };
}

const exportFunctions = {
    getLocation,
    getLocationByAddress
};

export default exportFunctions;


