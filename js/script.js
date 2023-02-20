let todayForcast = document.getElementById('today-forcast')
let tomoro =document.getElementById('tomoro')
let afterTomoro =document.getElementById('aftertomoro')
async function getData(city) {
    if (city == undefined) {
        city='cairo'
    }
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
    if (result.ok && result.status == 200) {
        let data = await result.json()
        display(data.current, data.location)
        displayTomoro(data.forecast.forecastday[1])
        displayAfterTomoro(data.forecast.forecastday[2])
    }
}
document.querySelector(".search input").addEventListener('keyup', (api) => {
    getData(api.target.value)
})
getData()
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let t = new Date();
function display(c, l) {
        let n = `
        <div class="forcast-head p-2 d-flex justify-content-between text-white">
                <div class="day">${days[t.getDay()]}</div>
                <div class="country">${t.getDate()}${months[t.getMonth()]}</div>
              </div>
              <div class="forcast-content text-white px-3 py-3 rounded-bottom-3">
                <div class="location">${l.name}</div>
                <div class="deg d-flex">
                  <div class="num" >
                    ${c.temp_c}
                    <sup>o</sup>
                    C
                  </div>
                  <div class="icon ms-auto align-self-center">
                    <img src="https://${c.condition.icon}" alt="">
                  </div>
                </div>
                <div class="cureent-weahter text-primary py-1">${c.condition.text}</div>
                <span class="p-2"><img src="images/icon-umberella.png" class="p-2">20%</span>
                <span class="p-2"><img src="images/mobile.png" class="p-2">18km/h</span>
                <span class="p-2"><img src="images/icon-compass.png" class="p-2">East</span>
              </div>
        `
    todayForcast.innerHTML=n
}
function displayTomoro(f) {
    let n = `
    <div class="next-forcast-head p-2 text-white">
                <div class="day">${days[t.getDay()+1]}</div>
              </div>
              <div class="next-forcast-content text-white py-2 rounded-bottom-3">
                <div class="icon ms-auto align-self-center">
                  <img src="https://${f.day.condition.icon}">
                </div>
                  <div class="num p-3" >
                    <div class="max-deg">
                      ${f.day.maxtemp_c}
                    <sup>o</sup>
                    C
                    </div>
                    <div class="min-deg">
                      ${f.day.mintemp_c}
                    <sup>o</sup>
                    C
                    </div>
                  </div>
                  <div class="curent-weahter text-primary py-2">${f.day.condition.text}</div>
                </div>
    `
    tomoro.innerHTML=n
}
function displayAfterTomoro(f) {
    n = `
    <div class="third-forcast-head p-2 text-white rounded-end-3">
                <div class="day">${days[t.getDay()+2]}</div>
              </div>
              <div class="third-forcast-content text-white py-2 rounded-bottom-3">
                <div class="icon ms-auto align-self-center">
                  <img src="https://${f.day.condition.icon}" alt="">
                </div>
                  <div class="num p-3" >
                    <div class="max-deg">
                      ${f.day.maxtemp_c}
                    <sup>o</sup>
                    C
                    </div>
                    <div class="min-deg">
                      ${f.day.mintemp_c}
                    <sup>o</sup>
                    C
                    </div>
                  </div>
                  <div class="curent-weahter text-primary py-2">${f.day.condition.text}</div>
                </div>
    `
    afterTomoro.innerHTML=n
}