// https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=6c3a1c3ad2fb2c760c7043eef83cad6e
import React,{useState,useEffect} from 'react'
import "./style.css"
import WeatherCard from './weatherCard';
const Temp = () => {
    const[searchvalue,setSearchValue] = useState("Ahmedabad");
    const[tempInfo,setTempInfo] = useState({});
    const getweatherinfo = async () =>{
            try {
                let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=6c3a1c3ad2fb2c760c7043eef83cad6e`;
                const res = await fetch(url);
                const data = await res.json();
                
                const {temp,humidity,pressure } = data.main;
                const {main:weathermood} = data.weather[0];
                const {name} = data;
                const {speed} = data.wind;
                const {country,sunset} = data.sys;
               const myNewWeatherInfo = {
                temp,humidity,pressure,weathermood,name,speed,country,sunset
               };
              
               setTempInfo(myNewWeatherInfo);
         
            } catch (error) {
                console.log(error);
            }
    }


    useEffect(()=>{
        getweatherinfo();
    },[]);
  return (
    <>
        <div className="wrap">
            <div className="search">
                 <input type="search" placeholder='Search' autoFocus id='search' className='searchTerm' value={searchvalue} onChange={(e)=>{setSearchValue(e.target.value)}} />   
                <button className="searchButton" type='button' onClick={getweatherinfo}>
                        Search
                </button>
            </div>    
        </div> 

        <WeatherCard tempInfo={tempInfo} />
    </>
  )
}

export default Temp
