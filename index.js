

let place=document.querySelector(".location");
let time_date=document.querySelector(".date-time");
let typeofweather=document.querySelector(".type");
let temp=document.querySelector(".temperature");
let min_max=document.querySelector(".min-max");
let temperature=document.querySelector(".temp");
let humidity=document.querySelector(".humidity");
let windblow=document.querySelector(".wind");
let pressure=document.querySelector(".pressure");
let icon=document.querySelector(".icon");

let city="pune";
let city_search=document.querySelector(".search-input");
city_search.addEventListener("click",()=>{
    city_search.placeholder="";
})
city_search.addEventListener("keypress",(e)=>{
    if (e.key=="Enter"){
    city=city_search.value;
    weatherToday();
    }
})
// console.log(search);
const weatherToday=async()=>{
    

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1a52af76c9275ae7fccb578d55bb4e0`
    try{
        const getcountry=(country)=>{
            const regionNamesInEnglish = new Intl.DisplayNames([country], { type: "region" });
            return(regionNamesInEnglish.of(country));
        }
        const res=await fetch(url);
        const data= await res.json();
        console.log(data);
        const {main,name,weather,wind,sys,dt}=data;                               
        place.innerHTML=`${name},${getcountry(sys.country)}`
       const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        // second:"numeric",
     };
        const formatter= new Intl.DateTimeFormat("en-US",options);
        const formattedData=formatter.format(dt);
        time_date.innerHTML=formattedData;
        typeofweather.innerHTML=data.weather[0].main;
        temp.innerHTML=`${main.temp}&#176C`;
        min_max.innerHTML=`Min ${main.temp_min} , Max${main.temp_max}`
        temperature.innerHTML=`<i class="fa-solid fa-temperature-three-quarters"></i> temperature ${main.temp} &#176C`;
        humidity.innerHTML=` <i class="fa-solid fa-droplet"></i> humidity ${main.humidity}`;
        pressure.innerHTML=`<i class="fa-solid fa-compress"></i> pressure ${main.pressure}`;
        windblow.innerHTML=` <i class="fa-solid fa-wind"></i> wind ${wind.speed}`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png " height="80px" alt="weather icon">`;

        


    }catch(error){
        console.log(error);
    }


    
    
};
window.addEventListener("load",weatherToday);