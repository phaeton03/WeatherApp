/**
 * @jest-environment jsdom
 */
import fs from "fs";

const container = window.document.body;
container.innerHTML = fs.readFileSync("./src/weather.html", "utf8");

import {drawMap} from "./weatherMap";

describe("drawMap", function () {
    it("is a function", () => {
        expect(drawMap).toBeInstanceOf(Function);
    });

    it("should add a map", () => {
        const LOCALHOST = 'http://localhost/';
        const img = document.querySelector(".map");

        expect(img.src).toMatch(LOCALHOST);

        drawMap(0.00, 0.00);

        expect(img.src).not.toMatch(LOCALHOST);
    });
});