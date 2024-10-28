
 export const getCountries = async ()=>{ 
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        return await response.json();
    } catch (error) {
        alert('country api error');
    }
};

export const getWeather = async(lat,lon) =>{ 
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74c2a8f9872ea2e46f48453a09a41371&units=metric`);
        const weatherAPI = await weatherResponse.json();
        console.log(weatherAPI.main.temp);
        return weatherAPI;
    } catch (error) {
        alert('weather api error');
    } 
};

export const getCountryByName = async (name)=>{ 
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await response.json();
        return data[0]; 
        
    } catch (error) {
        alert('country api error');
        console.log(error);
    }
};
