let temper = 0;
let weather = {
    apiKey: "feb9be663ed87f64a1c7cd9788c4890b", 
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
             + city
             + "&units=metric&appid="
             + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data, temper){
        const { name } = data; 
        const { icon, description } = data.weather[0];
        const { temp } = data.main;
        const { humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + humidity + " km/h";

        if (temp >= 54){ 
            document.querySelector(".outdoor").innerText = "\nNo outdoor exposure is advised due to a humidity of " + humidity + "% and a temp of " + temp + "°C.\nBe sure to drink at least 15 cups of water today.\nBeware: Heatstroke is an impertinent threat STAY IN DOORS!";
        } else if (temp >= 40){
            document.querySelector(".outdoor").innerText = "\nOnly 10 minutes of outdoor exposure is advised due to a humidity of " + humidity + "% and a temp of " + temp + "°C.\nBe sure to drink at least 20 cups of water today.\nBeware: Heatstroke is likely! Stay indoors.";
        } else if (temp >= 32){
            document.querySelector(".outdoor").innerText = "\nAt least 15 min of outdoor exposure is advised due to a humidity of " + humidity + "% and a temp of " + temp + "°C.\nBe sure to drink at least 15 cups of water today.\nBeware: You may expereince heat cramps and exhuastion.";
        }else if (temp >= 25){
            document.querySelector(".outdoor").innerText = "\nAt least 20 min of outdoor exposure is advised due to a humidity of " + humidity + "% and a temp of " + temp + "°C.\nBe sure to drink at least 12 cups of water today.\nBeware: You may expereince heat exhuastion."; 
        }else {
            document.querySelector(".outdoor").innerText = "\nAt least 30 min of outdoor exposure is advised due to a humidity of " + humidity + "% and a temp of " + temp + "°C.\nBe sure to drink at least 8 cups of water today.";
        }

        
        
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

    
document.querySelector(".search-wrapper").addEventListener("keyup", function(event) {
    if (event.key == "Enter"){
        weather.search();
        
    }
});
    
    
    


