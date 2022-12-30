/**
 * @jest-environment jsdom
 */
import * as geo from "./geo.js";
jest.mock('./geo.js', () => {
   return {
       geo: {
           getLocation: jest.fn()
       }
   }
});
import exportFunctions from "./geo.js";
import exportFunctionsWeatherMap from "./weatherMap.js";
import exportFunctionsWeather, {
    clearCityLocalStorageAboveThreshold,
    getWeather,
    getWeatherInCity,
    setCityToLocalStorage
} from "./weather.js";
import fs from "fs";
import { jest } from "@jest/globals";


const container = window.document.body;
container.innerHTML = fs.readFileSync("./src/weather.html", "utf8");

afterEach(() => {
    jest.clearAllMocks();
});

describe("getWeather", function () {
    const GET_LOCATION_RESULT = {
        latitude: 0.00,
        longitude: 0.00
    };
    const WEATHER_RESPONSE = {
        name: 'MOSCOW',
        main: {
            temp: -1.15
        }
    }
    it("is a function", () => {
        expect(getWeather).toBeInstanceOf(Function);
    });

    it("should call all inside functions", async () => {
        const getLocation = jest.spyOn(exportFunctions, "getLocation")
            .mockImplementation(() => GET_LOCATION_RESULT);
        fetch.mockResponseOnce(JSON.stringify(WEATHER_RESPONSE));
        const drawMap = jest.spyOn(exportFunctionsWeatherMap, "drawMap");

        await getWeather();

        expect(jest.isMockFunction(getLocation)).toBeTruthy();
        expect(getLocation).toHaveBeenCalledTimes(1);
        expect(drawMap).toHaveBeenCalledTimes(1);
    });

    it("should show correct city name and its temp", async () => {
        const getLocation = jest.spyOn(exportFunctions, "getLocation")
            .mockImplementation(() => GET_LOCATION_RESULT);
        fetch.mockResponseOnce(JSON.stringify(WEATHER_RESPONSE));
        const drawMap = jest.spyOn(exportFunctionsWeatherMap, "drawMap");

        await getWeather();

        const divWeather = document.querySelector('.weather');

        expect(divWeather.innerHTML.includes(WEATHER_RESPONSE.name)).toBeTruthy();
        expect(divWeather.innerHTML.includes(WEATHER_RESPONSE.main.temp)).toBeTruthy();
    });
});

describe("getWeatherInCity", function () {
    const CITY = "MOSCOW";
    const GET_LOCATION_RESULT = {
        latitude: 0.00,
        longitude: 0.00
    };
    const WEATHER_RESPONSE = {
        name: CITY,
        main: {
            temp: -1.15
        }
    }

    it("is a function", () => {
        expect(getWeatherInCity).toBeInstanceOf(Function);
    });

    it("should do nothing if CITY is empty", () => {
        const setCityToLocalStorageVar = jest.spyOn(exportFunctionsWeather, "setCityToLocalStorage")
        getWeatherInCity();

        expect(setCityToLocalStorageVar).not.toHaveBeenCalled();
    });

    it("should call all inside functions", async () => {
        const getLocationByAddress = jest.spyOn(exportFunctions, "getLocationByAddress")
            .mockImplementation(() => GET_LOCATION_RESULT);
        const setCityToLocalStorageVar = jest.spyOn(exportFunctionsWeather, "setCityToLocalStorage")
        const drawMap = jest.spyOn(exportFunctionsWeatherMap, "drawMap");

        fetch.mockResponseOnce(JSON.stringify(WEATHER_RESPONSE));

        await getWeatherInCity(CITY);

        expect(setCityToLocalStorageVar).toHaveBeenCalledTimes(1);
        expect(drawMap).toHaveBeenCalledTimes(1);
        expect(getLocationByAddress).toHaveBeenCalledTimes(1);
    });

    it("should show correct CITY name and its temp", async () => {
        const getLocation = jest.spyOn(exportFunctions, "getLocationByAddress")
            .mockImplementation(() => GET_LOCATION_RESULT);
        fetch.mockResponseOnce(JSON.stringify(WEATHER_RESPONSE));
        const drawMap = jest.spyOn(exportFunctionsWeatherMap, "drawMap");

        await getWeatherInCity(CITY);

        const divWeather = document.querySelector('.weather');

        expect(divWeather.innerHTML.includes(WEATHER_RESPONSE.name)).toBeTruthy();
        expect(divWeather.innerHTML.includes(WEATHER_RESPONSE.main.temp)).toBeTruthy();
    });
})

describe("setCityToLocalStorage", function () {
    const CITY_STORAGE = 'city';
    const CITY = "MOSCOW";
    const BERLIN = "BERLIN";
    const GET_LOCATION_RESULT = {
        latitude: 0.00,
        longitude: 0.00
    };
    const WEATHER_RESPONSE = {
        name: CITY,
        main: {
            temp: -1.15
        }
    }
    afterEach(() => {
        window.localStorage.clear();
    });

    it("is a function", () => {
        expect(setCityToLocalStorage).toBeInstanceOf(Function);
    });

    it("should add city to localStorage", () => {
        expect(window.localStorage.getItem(CITY_STORAGE)).toBeNull();

        setCityToLocalStorage(CITY);

        expect(window.localStorage.getItem(CITY_STORAGE)).toMatch(CITY);
    });

    it("should not add same city to localStorage", () => {
        expect(window.localStorage.getItem(CITY_STORAGE)).toBeNull();

        setCityToLocalStorage(CITY);
        setCityToLocalStorage(CITY);

        const city = window.localStorage.getItem(CITY_STORAGE);

        expect(JSON.parse(city).length).toBe(1);
    });

    it("should add two different cities to localStorage", () => {
        expect(window.localStorage.getItem(CITY_STORAGE)).toBeNull();

        setCityToLocalStorage(CITY);
        setCityToLocalStorage(BERLIN);

        const city = window.localStorage.getItem(CITY_STORAGE);

        expect(JSON.parse(city).length).toBe(2);
    });
})
