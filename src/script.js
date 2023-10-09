const apiKey = "dcb66753beab8eeb43ed7f4376e3244e"; // API Key de OpenWeatherMap
const apiKey2= "daaf426088812bcf0d77953b9da45778";
/*daaf426088812bcf0d77953b9da45778*/
/*989808493901fe025a5fb53517e8b8c7*/
/* Latitud : 51.5073219
Longitud : -0.1276474 

Latitud : 3.4517923
Longitud : -76.5324943

*/
const showImage = document.getElementById("weather-icon");
const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchPollution = document.getElementById("search-pollution");
searchPollution.style.display="none";
const searchCoordinates = document.getElementById("search-coordinates");
const searchResults = document.getElementById("search-result");


/* localizacion */
var searchLat = document.getElementById("search-lat");
var searchLon = document.getElementById("search-lon");
var valorLat;
var valorLon;
var lat;
var lon;

// Obtén el elemento RadioButton por su ID
var porCiudad = document.getElementById("por_ciudad");
var porSitio = document.getElementById("por_sitio");
document.getElementById("search-lat").disabled = true;
document.getElementById("search-lon").disabled = true;
document.getElementById("search-input").disabled = true;

function showPollution(){
  searchPollution.style.display="block";
  searchResults.style.display="none";
  searchCoordinates.style.display="none";
}

function hidePollution(){
  searchPollution.style.display="none";
  searchResults.style.display="block";
  searchCoordinates.style.display="block";
}

function seleccionarRadioButton() 
{
  // Verifica si está seleccionado
  if (porCiudad.checked) {
    // Hacer algo si está seleccionado
    document.getElementById("search-input").disabled = false;
    document.getElementById("search-lat").disabled = true;
    document.getElementById("search-lon").disabled = true;
  } 
  if (porSitio.checked) 
  {
    // Hacer algo si está seleccionado
    document.getElementById("search-lat").disabled = false;
    document.getElementById("search-lon").disabled = false;
    document.getElementById("search-input").disabled = true;
  } 
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir la recarga de la página al enviar el formulario
  const city = searchInput.value;
  valorLat = parseFloat(searchLat.value);
  valorLon = parseFloat(searchLon.value);
  
  if (city) 
  { 
      coordinatesLocationName(city);
      obtenerClima(city);
    
  } 
  else if(valorLat && valorLon)
  {   
      // Verifica si el valor es un número válido
      if (!isNaN(valorLat) || !isNaN(valorLon)) 
      {
        console.log("Valor Float Capturado Valido: ");
        airPollutionMan(valorLat,valorLon)
      } 
      else 
      {
        console.log("Entrada no es un número válido."+valorLat);
      }
  }
  else{alert("Por favor, ingrese una ciudad o posición geográfica del sitio");}
});


///convertir coordenadas
async function coordinatesLocationName(city) 
  {
    try {
      const response = await fetch(
             `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey2} `
      );
        
        if (response.ok) 
        {
          const data = await response.json();
          const coordinates = data[0];
          lat = coordinates.lat;
          lon = coordinates.lon;
          

          searchCoordinates.innerHTML = `
          Coordenadas Geográficas del Sitio:  
            <p> Latitud : ${lat}</p>
            <p> Longitud : ${lon}</p>
             `;
             airPollutionAuto(lat,lon);
        } 
        else 
        {
          searchCoordinates.textContent = "Ciudad NO encontrada.";
        }
       
    } 
    catch (error) 
    {
      console.error("Error:", error);
      searchCoordinates.textContent = "Ocurrió un error al obtener las coordenadas."; 
    }
  }


///airPollutionAuto
async function airPollutionAuto(lat,lon) 
  {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey2}`   
      );
      const data = await response.json();
  
        if (response.ok) 
        {
        const components = data.list[0].components;
          searchPollution.innerHTML = `
          <h2>Pollution Levels</h2>
          <p> CO (Monóxido de Carbono): ${components.co}</p>
            <p> NO (Óxido de Nitrógeno):  ${components.no}</p>
            <p> NO2 (Óxido de Nitrógeno):  ${components.no2}</p>
            <p> O3 (Ozono Troposférico): ${components.o3}</p>
            <p> SO2 (Dióxido de Azufre): ${components.so2}</p>
            <p> PM2.5 (Materia Particulada menor a 2.5 micrómetros): ${components.pm2_5}</p>
            <p> PM10 (Materia Particulada menor a 10 micrómetros):${components.pm10}</p>  
            <p> NH3 (Amoníaco):${components.nh3}</p> 
             `;
        } 
        else 
        {
          searchPollution.textContent = "Ciudad NO encontrada.";
        }
    } 
    catch (error) 
    {
      console.error("Error:", error);
      searchPollution.textContent = "Ocurrió un error al obtener la polución coordenada automática."; 
    }
  }


  ///airPollutionMan
async function airPollutionMan(valorLat,valorLon) 
{
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${valorLat}&lon=${valorLon}&appid=${apiKey2}` 
    
    );
    const data = await response.json();

      if (response.ok) 
      {
        coorCiudad(valorLat,valorLon);
      const components = data.list[0].components;
        searchPollution.innerHTML = `
          <h2>Niveles de Polución</h2>
          <p> CO (Monóxido de Carbono): ${components.co}</p>
          <p> NO (Óxido de Nitrógeno):  ${components.no}</p>
          <p> NO2 (Óxido de Nitrógeno):  ${components.no2}</p>
          <p> O3 (Ozono Troposférico): ${components.o3}</p>
          <p> SO2 (Dióxido de Azufre): ${components.so2}</p>
          <p> PM2.5 (Materia Particulada menor a 2.5 micrómetros): ${components.pm2_5}</p>
          <p> PM10 (Materia Particulada menor a 10 micrómetros):${components.pm10}</p>  
          <p> NH3 (Amoníaco):${components.nh3}</p> 
           `;
      } 
      else 
      {
        searchPollution.textContent = "Ciudad NO encontrada.";
      }
  } 
  catch (error) 
  {
    console.error("Error:", error);
    searchPollution.textContent = "Ocurrió un error al obtener la polución coordenada manual."; 
  }
}


 ///coordenada a Ciudad
 async function coorCiudad(latitud, longitud) {
  console.log(latitud, longitud);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitud}&lon=${longitud}&appid=${apiKey2}`
    );
    const data = await response.json();

    if (response.ok && data[0] && data[0].name) {
      const cityName = data[0].name;
      console.log(`Nombre de la ciudad: ${cityName}`);
      obtenerClima(cityName);
    } else {
      console.log("Ciudad NO encontrada.");
    }
  } catch (error) {
    console.log("Error al buscar la ciudad:", error);
  }
}


////clima
async function obtenerClima(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey2}`
     
    );
    const data = await response.json();

      if (response.ok) 
      {
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const cityName = data.name;
        const country = data.sys.country;
        const wind=data.wind.speed;
        const deg=data.wind.deg;
        const weatherIcon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        showImage.innerHTML=` <img src="${iconUrl}">`;
      
        searchResults.innerHTML = `
          <p> Clima en ${cityName}, ${country}:</p>
          <p> Descripción: ${description} </p>
          <p> Temperatura: ${temperature}°C</p>  
          <p> Velocidad del Viento: ${wind}</p>
          <p> Rumbo: ${deg}</p>
         `;
      } 
      else 
      {
        searchResults.textContent = "Ciudad no encontrada.";
      }
  } 
  catch (error) 
  {
    console.error("Error:", error);
    searchResults.textContent = "Ocurrió un error al obtener el clima.";
  }
}
