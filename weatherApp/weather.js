const apiKey="175ba35327bc6fb29e47faa0d17186ed";

const button=document.querySelector(".getWeather");
const input=document.querySelector(".city");
const locationBtn=document.querySelector(".locationBtn");
let forecast=document.querySelector(".forecast");
const clearBtn=document.querySelector(".clear");

button.addEventListener("click",getWeather);
input.addEventListener("keydown",(event)=>
{
    if(event.key==="Enter")
    {     
        getWeather();
    }
    
});
locationBtn.addEventListener("click",()=>
{  
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success,error);
    }
    else
    {
        alert("geolocation is not supported by your browser");
        return;
    }   
});
clearBtn.addEventListener("click",()=>
{
    document.querySelector(".result").innerHTML=" ";
    document.querySelector(".forecast").innerHTML=" ";
    input.value=" ";
});
function success(position)
{
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    const getWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

   Promise.all
   ([
      fetch(getWeatherUrl).then(response=>response.json()),
      fetch(forecastUrl).then(response=>response.json())
   ])
   .then(([getWeatherData,forecastData])=>
   {
      showWeather(getWeatherData);
      showForecast(forecastData);
   })
    .catch(()=>{alert("unable to get weather for your location")});
}
function error()
{
    alert("location access denied");
}
function getWeather()
{
    const city=input.value.trim();
    if(!city)
    {
        alert("enter the city name please");
        return;
    } 
    const getWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    Promise.all([
        fetch(getWeatherUrl).then(response=>response.json()),
        fetch(forecastUrl).then(response=>response.json())
    ])
    .then(([weatherData,forecastData])=>
    {
        showWeather(weatherData);
        showForecast(forecastData);
    })
    .catch(()=>alert("error fetchingforecast"));
}

function showWeather(data)
{
    if(data.cod==="404")
    {
        document.querySelector(".result").innerHTML=`<h1>city not found</h1>`;
        return;
    }
       
        document.querySelector(".result").innerHTML=`  
        <h3>${data.name}</h3>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
        <p>Temperature:<b>${data.main.temp}<sup>&deg</sup>C</b></p>
        <p>humidity:<b>${data.main.humidity}%</b></p>
        <p>feels like <b>${data.main.feels_like}<sup>&deg</sup>C</b></p>
        <p>wind speed:${data.wind.speed}</p>
        <p>Description:${data.weather[0].description}</p>`;
}
function showForecast(fdata)
{
    forecast.innerHTML="";
    const dailyForecast=fdata.list.filter(item=>item.dt_txt.includes("12:00:00"));
    dailyForecast.forEach(day=>
    {
        const date=new Date(day.dt_txt).toLocaleDateString("en-US",{weekday:"short", month:"short", day:"numeric"});
        const icon=`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"`;
        const temp= Math.round(day.main.temp);
        const desc=day.weather[0].description;
        forecast.innerHTML+=`
        <div class=forecast-card>
        <h4>${date}</h4>
        <img src="${icon}">
        <p>${temp}&deg;C</p>
        <p>${desc}</p>
        </div>`
    })
}


        
