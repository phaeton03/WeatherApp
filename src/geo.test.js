import {getLocation, getLocationByAddress} from "./geo.js";


describe("getLocation2", function () {
    const RESPONSE = {
        location: {
            latitude: 0.00,
            longitude: 0.00
        }
    };

    const RESULT = {
        latitude: 0.00,
        longitude: 0.00
    }
    it("is a function", () => {
        expect(getLocation).toBeInstanceOf(Function);
    });

    it("should return correct value", async () => {
        fetch.mockResponseOnce(JSON.stringify(RESPONSE));

        const res = await getLocation();

        expect(res).toEqual(RESULT);
    });
});

describe("getLocationByAddress", function () {
    const MOCSOW = 'MOSCOW';

    const RESPONSE_MOSCOW = {
        features: [
            {
                properties: {
                    lat: 55.75,
                    lon: 37.61
                }
            },
            {
                properties: {
                    lat: 0.00,
                    lon: 0.00
                }
            }
        ]
    };

    const RESULT = {
        latitude: 55.75,
        longitude: 37.61
    }
    it("is a function", () => {
        expect(getLocationByAddress).toBeInstanceOf(Function);
    });

    it("should return correct result", async () => {
        fetch.mockResponseOnce(JSON.stringify(RESPONSE_MOSCOW));

        const res = await getLocationByAddress(MOCSOW);

        expect(res).toEqual(RESULT);
    });
});