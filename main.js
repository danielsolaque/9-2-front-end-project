
// I am bringing this new data because the only value about the weather that I have 
// available in our fetched data is the weatherCode so, this new data taken from the same Api allows us
// to know the exact type of weather and therefore make the link with the correct playlist. 

// https://github.com/chubin/wttr.in/blob/master/lib/constants.py
const CODES_TO_WEATHER_MAP = {
    "113": "Sunny",
    "116": "PartlyCloudy",
    "119": "Cloudy",
    "122": "VeryCloudy",
    "143": "Fog",
    "176": "LightShowers",
    "179": "LightSleetShowers",
    "182": "LightSleet",
    "185": "LightSleet",
    "200": "ThunderyShowers",
    "227": "LightSnow",
    "230": "HeavySnow",
    "248": "Fog",
    "260": "Fog",
    "263": "LightShowers",
    "266": "LightRain",
    "281": "LightSleet",
    "284": "LightSleet",
    "293": "LightRain",
    "296": "LightRain",
    "299": "HeavyShowers",
    "302": "HeavyRain",
    "305": "HeavyShowers",
    "308": "HeavyRain",
    "311": "LightSleet",
    "314": "LightSleet",
    "317": "LightSleet",
    "320": "LightSnow",
    "323": "LightSnowShowers",
    "326": "LightSnowShowers",
    "329": "HeavySnow",
    "332": "HeavySnow",
    "335": "HeavySnowShowers",
    "338": "HeavySnow",
    "350": "LightSleet",
    "353": "LightShowers",
    "356": "HeavyShowers",
    "359": "HeavyRain",
    "362": "LightSleetShowers",
    "365": "LightSleetShowers",
    "368": "LightSnowShowers",
    "371": "HeavySnowShowers",
    "374": "LightSleetShowers",
    "377": "LightSleet",
    "386": "ThunderyShowers",
    "389": "ThunderyHeavyRain",
    "392": "ThunderySnowShowers",
    "395": "HeavySnowShowers",
}

// music tags 
// https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=b314094feae7b788e69ff1755cca4105&format=json
const WEATHER_TO_MUSIC_TAG_MAP = {
    "Unknown":             { icon: "✨", musicTag: 'rock' },
    "Cloudy":              { icon: "☁️", musicTag: 'pop' },
    "Fog":                 { icon: "🌫", musicTag: 'indie' },
    "HeavyRain":           { icon: "🌧", musicTag: "psychedelic" },
    "HeavyShowers":        { icon: "🌧", musicTag: 'ambient' },
    "HeavySnow":           { icon: "❄️", musicTag: 'classical'},
    "HeavySnowShowers":    { icon: "❄️", musicTag: 'classical'},
    "LightRain":           { icon: "🌦", musicTag: 'acoustic' },
    "LightShowers":        { icon: "🌦", musicTag: 'acoustic'},
    "LightSleet":          { icon: "🌧", musicTag: 'acoustic' },
    "LightSleetShowers":   { icon: "🌧", musicTag: 'acoustic' },
    "LightSnow":           { icon: "🌧", musicTag: 'jazz' },
    "LightSnowShowers":    { icon: "🌧", musicTag: 'jazz' },
    "PartlyCloudy":        { icon: "⛅️", musicTag: 'acoustic' },
    "Sunny":               { icon: "☀️", musicTag: 'dance' },
    "ThunderyHeavyRain":   { icon: "🌩", musicTag: 'rock' },
    "ThunderyShowers":     { icon: "⛈", musicTag: 'rock' },
    "ThunderySnowShowers": { icon: "⛈", musicTag: 'rock' },
    "VeryCloudy":          { icon: "☁️", musicTag: 'indie' },
}

// API Key LAST.FM : b314094feae7b788e69ff1755cca4105
// user:danielsolaque

const LAST_FM_API_KEY = 'b314094feae7b788e69ff1755cca4105'
const LAST_FM_ENDPOINT = (musicTag) => `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${musicTag}&api_key=${LAST_FM_API_KEY}&format=json`

const WTTR_IN_ENDPOINT = (city) => `https://wttr.in/${city}?format=j1`

const HEROKUAPP_ENDPOINT = "https://pursuit-9-2-full-stack-project.herokuapp.com/api/quotes"

// Listando los diferentes campos a from HEROKUAPP_ENDPOINT
function mySecondHtml () {
    location.href = "aboutDeveloper.html"
}

//Lets put focus in our form
const searchFormElement = document.querySelector(".search-form")

const renderError = (message) => {
    // const weatherContainer = document.querySelector('.aside-container__weather')
    // weatherContainer.innerHTML = `<h4>${message}</h4>`

    const playlistContainer = document.querySelector(".main-container__playlist")
    playlistContainer.innerHTML = `<h4>${message}</h4>`
}

//Lets bring a function to hear our event:
searchFormElement.addEventListener('submit', event => {
    event.preventDefault() //to avoid updates by default from the page.

    ////Lets catch the location's value
    const searchInputElement = document.querySelector('#location')
    const searchInputValue = searchInputElement.value

    if (!searchInputValue) {
        renderError('Need to type a location to search for.')
        return
    }

    fetch(WTTR_IN_ENDPOINT(searchInputValue))
        .then(weatherResponse => {
            if (weatherResponse.status === 404) { //En este punto inducimos el error ya que la API cuando arroja error tambien arroja informacion, por lo que no entra en el catch que hemso disenado.
                throw new Error("City not found")
            }

            return weatherResponse.json()
        })
        .then(weatherData => {
            // Recieve the weatherCode provided by the API
            const weatherCode = weatherData.current_condition[0].weatherCode
            // Recieve the weatherCode provided by the API
            const weatherTemp = weatherData.current_condition[0].temp_F
            // Map the weatherCode into the weather type
            const weatherType = CODES_TO_WEATHER_MAP[weatherCode] 

            // console.log(weatherType)
            // Map the weather type into the music tag and icon
            const { icon, musicTag } = WEATHER_TO_MUSIC_TAG_MAP[weatherType]
            

            //**************************WORKING ON THE ASIDE BLOCK*********************************** */
            
            //
            //in this point we have already getting : weatherType and the icon.
            const weatherContainer = document.querySelector('.aside-container__weather')
            weatherContainer.innerHTML = "" ///primero se accede a la referencia y luego se limpia.


            const weatherArticleElement = document.createElement('article') // <article> </article>
            /////que elementos vamos a crear dentro de este "article"?
            const weatherArticleHTML = 
            `   
                <span class="weather-icon"> ${icon} </span>
                <p> In ${searchInputValue} is </p>
                <h3> ${weatherType} </h3>
                <h3> ${weatherTemp} °F</h3>

            ` 

            weatherArticleElement.innerHTML = weatherArticleHTML
            weatherContainer.appendChild(weatherArticleElement)
            
            // RENDER DEL LISTADO DE CANCIONES (Logic instructions):
            //1.Obtener la referencia del elemento.
            //2.Crear los elementos HTML (en este caso un article) con la data del tiempo (a traves de .innerHTML).
            //3.Introducir esos elementos en nuestro archivo HTML desde Js a traves del appendChild.

            //**************************WORKING ON THE MAIN BLOCK*********************************** */
            fetch(LAST_FM_ENDPOINT(musicTag))
            .then (musicResponse => musicResponse.json())
            .then (musicData =>{
                const topTracks = musicData.tracks.track.slice(0, 10) // OBTENER LAS PRIMERAS 10 CANCIONES
                const playlistContainer = document.querySelector(".main-container__playlist")
                playlistContainer.innerHTML = "<h4>Here are the songs you might like to listen to in this weather.</h4>"// CON ESTO NOS ASEGURAMOS RESETEAR EL CONTENEDOR PARA QUE SIEMPRE SE MUESTREN 10 CANCIONES.

                topTracks.forEach(track => {
                    const trackArticleElement = document.createElement('a') // <a> </a>
                    trackArticleElement.classList.add('track-card') // <a class="track-card"> </a>
                    trackArticleElement.href = track.url // Hacemos que este elemteo sea cilickeable : <a class="track-card" href="http://lastfm......"> </a>

                    // Definimos el contenido INTERNO
                    const trackArticleHTML =
                    `   
                        <h2>${track.name}</h2>
                        <p>Artist: ${track.artist.name}</p>
                    `
                   
                    // Agregamos el contenido interno
                    trackArticleElement.innerHTML = trackArticleHTML
                     /*
                        <a class="track-card" href="https://lastfm........">
                            <h2>${track.name}</h2>
                            <p>Artist: ${track.artist.name}</p>
                        </a>
                    */

                    // AÑADIMOS EL ELEMENTO GENERADO EN TODO EL BLOQUE DE CODIGO ANTERIO, AL DOM (HTML)
                    playlistContainer.appendChild(trackArticleElement) // lo anexamos
                })

                // RENDER DEL LISTADO DE CANCIONES (Logic instructions)
                // 1.Eliminar mensaje contenido en el .init-msg
                  // 1.1  Segmentar la parte del codigo html con el que queremos trabajar '.init-msg' 
                  // 1.2  Comprobar SI existe aun el elemento ".init-msg".
                  // 1.3  SI el paso 1.2 es cierto, entonces borrar el elemento ".init-msg".

                
                //2.Mostrar la playlist de canciones.
                  // 2.1 Obtener la referencia al elemento con la clase .main-container__playlist (donde quiero mostrar las canciones)
                  // 2.2 Crear los elementos Html (en este caso un article) con la data obtenida de las canciones (.innerHTML).
                  //2.3 Introducir esos elementos en nuestro archivo HTML desde Js a traves del appendChild.
            })
        })
        .catch(err => {
            renderError("Sorry, we couln't find the weather for the city you were looking for.")
        })
    searchInputElement.value = ''
})

