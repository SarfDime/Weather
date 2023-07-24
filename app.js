const cityDiv = document.querySelector(".currentCity")
const cityNamePar = document.querySelector(".cityName")
const cityInfoDiv = document.querySelector(".cityInfo")
const hourlyBtn = document.querySelector(".hourlyButton")
const weeklyBtn = document.querySelector(".weeklyButton")
const mainImg = document.querySelector("#mainImage")

const temperatureDiv = document.querySelector(".currentTemperature");
const weatherImg = document.querySelector(".weatherImage")
const cityTemPar = document.querySelector("#tempDisp")
const tempTypeBtm = document.querySelector(".temperatureType")

const searchDiv = document.querySelector(".searchCity")
const cityInp = document.querySelector(".cityInput")

const foreCastDiv = document.querySelector(".foreCast")

const hOne = document.querySelector(".hOne")
const imageOne = document.querySelector("#imageOne")
const extraOne = document.querySelector(".extraOne")

const hTwo = document.querySelector(".hTwo")
const extraTwo = document.querySelector(".extraTwo")
const imageTwo = document.querySelector("#imageTwo")

const hThree = document.querySelector(".hThree")
const extraThree = document.querySelector(".extraThree")
const imageThree = document.querySelector("#imageThree")

const currentForecast = document.querySelector(".currentForecast")
const currentExtra = document.querySelector(".currentExtra")
const imageFour = document.querySelector("#currentImage")

const hFive = document.querySelector(".hFive")
const imageFive = document.querySelector("#imageFive")
const extraFive = document.querySelector(".extraFive")

const hSix = document.querySelector(".hSix")
const extraSix = document.querySelector(".extraSix")
const imageSix = document.querySelector("#imageSix")

const hSeven = document.querySelector(".hSeven")
const imageSeven = document.querySelector("#imageSeven")
const extraSeven = document.querySelector(".extraSeven")

const timeDisplay = document.querySelector("#time")
const dateDisplay = document.querySelector(".date")
const citiesUl = document.querySelector(".citiesListV")
const minTempDisp = document.querySelector(".minTemp")
const maxTempDisp = document.querySelector(".maxTemp")
const percDisp = document.querySelector(".precipitation")
const windSpeedDIsp = document.querySelector(".wind-speed")
const weatherCondition = document.querySelector(".weatherCondition")
const windImg = document.querySelector("#windImage")
const weatherInfoDiv = document.querySelector(".weatherInfo")
const bkgImage = document.querySelector("#bkgImg")
const loadingAni = document.querySelectorAll(".loadingAnimation")
const currentLocBtn = document.querySelector(".currentLocation");
const foreCastDivOne = document.querySelector(".foreCastDiv");
const tempsAndModesDiv = document.querySelector(".tempsAndModes");

class WeatherConditions {
    constructor(tod) {
        this.conditions = [
            {
                code: [0, 1],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/clear-${tod}.svg`,
                bimg: `./imgs/backgorund3.jpg`,
                text: `There's Clear Skies`
            },
            {
                code: [2],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}.svg`,
                bimg: `./imgs/backgorund3.jpg`,
                text: `It's Partly Clody`
            },
            {
                code: [3],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/overcast-${tod}.svg`,
                bimg: `./imgs/backgorund2.jpg`,
                text: `The Sky is Overcast`
            },
            {
                code: [45, 48],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/fog-${tod}.svg`,
                bimg: `./imgs/backgorund5.jpg`,
                text: `There's Foggy weather`
            },
            {
                code: [51, 53, 55],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-drizzle.svg`,
                bimg: `./imgs/backgorund1.jpg`,
                text: `A moderade Drizzle`
            },
            {
                code: [56],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-sleet.svg`,
                bimg: `./imgs/backgorund1.jpg`,
                text: `A Freezing Dizzle`
            },
            {
                code: [57],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-hail.svg`,
                bimg: `./imgs/backgorund1.jpg`,
                text: `There's Hail`
            },
            {
                code: [61, 63, 65, 66, 67, 80, 81, 82],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-rain.svg`,
                bimg: `./imgs/backgorund1.jpg`,
                text: `It's Rainy`
            },
            {
                code: [71, 73, 75, 77, 85, 86],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/partly-cloudy-${tod}-snow.svg`,
                bimg: `./imgs/backgorund6.jpg`,
                text: `It's Snowy`
            },
            {
                code: [95],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}.svg`,
                bimg: `./imgs/backgorund4.jpg`,
                text: `There's a Thunderstorm`
            },
            {
                code: [96, 99],
                img: `https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/thunderstorms-${tod}-rain.svg`,
                bimg: `./imgs/backgorund4.jpg`,
                text: `Thunderstorm with Hail`
            }
        ]
    }
}

const WindConditions = [
    { maxSpeed: Infinity, minSpeed: 68, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-12.svg" },
    { maxSpeed: 67, minSpeed: 58, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-11.svg" },
    { maxSpeed: 58, minSpeed: 50, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-10.svg" },
    { maxSpeed: 50, minSpeed: 42, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-9.svg" },
    { maxSpeed: 42, minSpeed: 34, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-8.svg" },
    { maxSpeed: 34, minSpeed: 27, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-7.svg" },
    { maxSpeed: 27, minSpeed: 21, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-6.svg" },
    { maxSpeed: 21, minSpeed: 15, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-5.svg" },
    { maxSpeed: 15, minSpeed: 9, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-4.svg" },
    { maxSpeed: 9, minSpeed: 5, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-3.svg" },
    { maxSpeed: 5, minSpeed: 2, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-2.svg" },
    { maxSpeed: 2, minSpeed: 1, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-1.svg" },
    { maxSpeed: 0, minSpeed: 0, img: "https://github.com/basmilius/weather-icons/raw/dev/production/fill/svg/wind-beaufort-0.svg" }
]

const forecastElements = [hOne, hTwo, hThree, currentForecast, hFive, hSix, hSeven, imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix, imageSeven, extraOne, extraTwo, extraThree, currentExtra, extraFive, extraSix, extraSeven]

let newSuperArray = [forecastElements.filter((v, index) => index >= 0 && index < 7), forecastElements.filter((v, index) => index >= 7 && index < 14), forecastElements.filter((v, index) => index >= 14 && index < 21)]

let currentCityCords = {
    latitude: 41.99646,
    longitude: 21.43141
}

let currentCity;
let newDate;
let intervalId;
let sunrise;
let sunset;
let firstPress = true;

let weeklyPressed = false
hourlyBtn.classList.add("show-before");

let unit = "°C"
let uni = "&"

let speedUnit = "km/h"
let timeOfDay = "day"

function getTime(timezone) {
    let abrv = "th"
    newDate = new Date().toLocaleString("en-US", { timeZone: timezone });
    const hours = new Date(newDate).getHours()
    const minutes = new Date(newDate).getMinutes()
    const seconds = new Date(newDate).getSeconds()
    const month = new Date(newDate).toLocaleString('default', { month: 'long' });
    const day = new Date(newDate).getDate()
    switch (day % 10) {
        case 1:
            abrv = "st"
            break;
        case 2:
            abrv = "nd"
            break;
        case 3:
            abrv = "rd"
            break;
        default:
            abrv = "th"
    }
    timeDisplay.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    dateDisplay.innerHTML = `${ month } ${ day }${ abrv }`;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        getTime(timezone);
    }, 1000);
}

const makeCall = async url => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log('The request failed!');
        return error
    }
}