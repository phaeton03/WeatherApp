const yandexMapUrl = (lat, lon) =>`https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${lon},${lat}&size=450,450&z=10&l=map&pt=32.810152,39.889847,pm2rdl1~32.870152,39.869847,pm2rdl99`;

export function drawMap(lat, lon) {
    const img = document.querySelector(".map");

    img.src = yandexMapUrl(lat, lon);
}

const exportFunctionsWeatherMap = {
    drawMap
};

export default exportFunctionsWeatherMap;