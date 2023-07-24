function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            currentCityCords.latitude = position.coords.latitude
            currentCityCords.longitude = position.coords.longitude
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "current")
        },
        function (error) {
            console.error("Error: " + error.message)
        }
    )
}

const getCityWeather = async (long, lat, unitOf, direction) => {
    let cityName;
    const d = await makeCall(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true${unitOf}timezone=auto&past_days=3`)
    if (direction === "current") {
        const cityData = await makeCall(`https://us1.locationiq.com/v1/reverse?key=pk.49ced388945b8065383aaa4be8cfad8e&lat=${lat}&lon=${long}&format=json`)
        if (cityData.address.city !== undefined) {
            city = cityData.address.city
            getGeoCity(cityName, direction, "noNeed")
        } else {
            cityName = cityData.address.state
            cityName = cityName.substring(0, cityName.indexOf(" "))
            getGeoCity(cityName, direction, cityData.address.village)
        }
    }
    updateValues(d)
    setWeatherImage(d.current_weather.weathercode, timeOfDay, mainImg, weatherCondition, "direct")
}

const getGeoCity = async (city, direction, village) => {
    const d = await makeCall(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`)
    if (direction === "current") {
        for (let i = 0; i < d.results.length; i++) {
            if (currentCityCords.longitude.toFixed(0) === d.results[i].longitude.toFixed(0)) {
                updateValuesTwo(d.results[i], city, direction, village)
            }
        }
        return
    }
    if (d.results === undefined) {
        cityInp.style.border = "1px solid red"
        citiesUl.style.visibility = "hidden"
        citiesUl.style.height = "0"
        return
    }
    searchCity(citiesUl, d.results)
}

function searchCity(ul, array) {
    if (ul.style.visibility != "visible") {
        ul.style.visibility = "visible"
        ul.style.height = "fit-content"
    }
    for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        if (array[i].admin1 !== undefined) {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${array[i].country_code.toLowerCase()}.svg"> <h4>${array[i].name}</h4>(${array[i].admin1}, ${array[i].country})`
        } else {
            li.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${array[i].country_code.toLowerCase()}.svg"> <h4>${array[i].name}</h4>(${array[i].country})`
        }
        li.addEventListener("click", () => {
            currentCityCords.latitude = array[i].latitude
            currentCityCords.longitude = array[i].longitude
            currentCity = array[i]
            ul.style.visibility = "hidden"
            ul.style.height = "0"
            cityInp.value = ""
            updateValuesTwo(array[i])
            getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
            for (let anim of loadingAni) {
                anim.style.visibility = "visible"
            }
            setOpacity()
        });
        ul.appendChild(li);
    }
}

function roundPercision(value, precision) {
    let multiplier = Math.pow(10, precision || 0)
    return Math.round(value * multiplier) / multiplier
}

function getPreviousThreeDatesIndex(object, day, month, hour) {
    let index = 0
    let dates = []
    let dayOfWeek = []
    let newDates = []
    let days = []

    if (weeklyPressed) {
        dates = object.daily.time.slice(0, 1)
    } else {
        dates = object.hourly.time
    }
    for (let i = 0; i < dates.length; i++) {
        let date = new Date(dates[i]);
        if (date.getDate() == day && date.getMonth() + 1 == month + 1 && date.getHours() == hour) {
            index = i - 3
        }
    }

    let tempArray = []
    let tempArrayTwo = []
    let tempArrayThree = []

    for (let i = index; i < index + 7; i++) {
        if (weeklyPressed) {
            newDates.push(object.daily.time[i])
            tempArray.push(object.daily.temperature_2m_max[i])
            tempArrayTwo.push(object.daily.weathercode[i])
            tempArrayThree.push(object.daily.temperature_2m_min[i])
        } else {
            newDates.push(object.hourly.time[i])
            tempArray.push(object.hourly.temperature_2m[i])
            tempArrayTwo.push(object.hourly.weathercode[i])
        }
    }

    for (let date of newDates) {
        let dateObject = new Date(date);
        if (weeklyPressed) {
            dayOfWeek = dateObject.toLocaleString('default', { weekday: 'short' })
        } else {
            dayOfWeek = dateObject.toLocaleString('default', { hour: 'numeric' })
        }
        days.push(dayOfWeek)
    }

    if (weeklyPressed) {
        getHourlyForecast(days, tempArray, tempArrayTwo, tempArrayThree)
        return
    }
    getHourlyForecast(days, tempArray, tempArrayTwo, [], newDates)
}

function getHourlyForecast(arrayOne, arrayTwo, arrayThree, arrayFour, hoursArray) {
    newSuperArray.forEach((innerArray) => {
        innerArray.forEach((element, i) => {
            if (element.nodeName === "H3") {
                innerArray[i].innerHTML = `${arrayOne[i]}`
            }
            if (element.nodeName === "DIV") {
                if (weeklyPressed) {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}°</h4><h5>${arrayFour[i]}°</h5>`
                } else {
                    innerArray[i].innerHTML = `<h4>${arrayTwo[i]}${unit}</h4>`
                }
            }
            if (element.nodeName === "IMG") {
                if (weeklyPressed) {
                    setWeatherImage(arrayThree[i], timeOfDay, innerArray[i], undefined, "indirect")
                } else {
                    if (new Date(hoursArray[i]).getHours() > sunset || new Date(hoursArray[i]).getHours() < sunrise) {
                        setWeatherImage(arrayThree[i], "night", innerArray[i], undefined, "indirect")
                    } else {
                        setWeatherImage(arrayThree[i], "day", innerArray[i], undefined, "indirect")
                    }
                }
            }
        });
    });
}

function setWindSpeed(windSpeed) {
    let curWindSpeed;
    if (speedUnit === "km/h") {
        curWindSpeed = windSpeed * 0.621371
        curWindSpeed = roundPercision(curWindSpeed, 1)
    } else {
        curWindSpeed = windSpeed
    }
    WindConditions.forEach(e => {
        if (curWindSpeed >= e.minSpeed && curWindSpeed <= e.maxSpeed) {
            windImg.src = e.img;
        }
    })
}

function setWeatherImage(weatherCode, tod, image, textElement, direction) {
    let conditionsOne = new WeatherConditions(tod)
    for (let condition in conditionsOne.conditions) {
        if (conditionsOne.conditions[condition].code.includes(weatherCode)) {
            if (direction === "indirect") {
                image.src = conditionsOne.conditions[condition].img
            } else {
                image.src = conditionsOne.conditions[condition].img
                bkgImage.src = conditionsOne.conditions[condition].bimg
                textElement.innerHTML = conditionsOne.conditions[condition].text
            }
            break;
        }
    }
}

function setOpacity(){
    if(!firstPress) return
    tempsAndModesDiv.style.opacity = 1
    foreCastDivOne.style.opacity = 1
    currentLocBtn.style.margin = "0 0 -1.5rem 0"
    firstPress = false
}

function updateValues(obj) {
    cityTemPar.innerHTML = obj.current_weather.temperature
    minTempDisp.innerHTML = `Min Temp: ${obj.daily.temperature_2m_min[3]}${unit}`
    maxTempDisp.innerHTML = `Max Temp: ${obj.daily.temperature_2m_max[3]}${unit}`
    percDisp.innerHTML = `Precipitation: ${obj.daily.precipitation_sum[3]} %`
    windSpeedDIsp.innerHTML = `Wind Speed: ${obj.current_weather.windspeed} ${speedUnit}`
    setWindSpeed(obj.current_weather.windspeed)
    getTime(obj.timezone)
    let newDateOne = new Date(obj.daily.sunrise[3])
    let newDateTwo = new Date(obj.daily.sunset[3])
    sunrise = newDateOne.getHours();
    sunset = newDateTwo.getHours();
    if (new Date(newDate).getHours() > sunset || new Date(newDate).getHours() < sunrise) {
        timeOfDay = "night"
    }
    getPreviousThreeDatesIndex(obj, new Date(newDate).getDate(), new Date(newDate).getMonth(), new Date(newDate).getHours())
    for (let anim of loadingAni) {
        anim.style.visibility = "hidden"
    }
}

function updateValuesTwo(obj, city, direction, village) {
    if (direction === "current") {
        if (village !== "noNeed") {
            cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${village}, ${obj.country_code} `
            currentCity = village
            return
        }
        cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${city}, ${obj.country_code} `
        currentCity = city
        return
    }
    cityNamePar.innerHTML = `<img src="https://hatscripts.github.io/circle-flags/flags/${obj.country_code.toLowerCase()}.svg"> ${obj.name}, ${obj.country_code} `
}

cityInp.addEventListener("input", () => {
    cityInp.style.border = "none"
    citiesUl.innerHTML = ''
    if (cityInp.value === "") {
        cityInp.style.border = "none"
        return
    }
    getGeoCity(cityInp.value, "new")
})

tempTypeBtm.addEventListener("click", () => {
    if(currentCity === undefined) return
    if (uni === "&") {
        uni = "&temperature_unit=fahrenheit&windspeed_unit=mph&"
        unit = "°F"
        speedUnit = "mp/h"
        tempTypeBtm.innerHTML = "°F"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
        for (let anim of loadingAni) {
            anim.style.visibility = "visible"
        }
    } else {
        uni = "&"
        unit = "°C"
        speedUnit = "km/h"
        tempTypeBtm.innerHTML = "°C"
        getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
        for (let anim of loadingAni) {
            anim.style.visibility = "visible"
        }
    }
})

hourlyBtn.addEventListener("click", () => {
    if (!weeklyPressed) return
    hourlyBtn.classList.add("show-before")
    weeklyBtn.classList.remove("show-before")
    weeklyPressed = false
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    for (let anim of loadingAni) {
        anim.style.visibility = "visible"
    }
})

weeklyBtn.addEventListener("click", () => {
    if (weeklyPressed) return
    weeklyBtn.classList.add("show-before")
    hourlyBtn.classList.remove("show-before")
    weeklyPressed = true
    getCityWeather(currentCityCords.longitude, currentCityCords.latitude, uni, "new")
    for (let anim of loadingAni) {
        anim.style.visibility = "visible"
    }
})

currentLocBtn.addEventListener("click", () => {
    getCurrentPosition()
    for (let anim of loadingAni) {
        anim.style.visibility = "visible"
    }
    setOpacity()
})