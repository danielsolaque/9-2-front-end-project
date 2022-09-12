// API Key LAST.FM : b314094feae7b788e69ff1755cca4105
// user:danielsolaque

const LAST_FM_API_KEY = 'b314094feae7b788e69ff1755cca4105'
const LAST_FM_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&api_key=${LAST_FM_API_KEY}&format=json`

const WTTR_IN_ENDPOINT = 'https://wttr.in/Detroit?format=j1'

const HEROKUAPP_ENDPOINT = "https://pursuit-9-2-full-stack-project.herokuapp.com/api/quotes"

// LastFM fetch tracks data by tag
fetch (LAST_FM_ENDPOINT)
 .then(response=> response.json())
 .then(data => console.log(data))
 
// Wttr.in fetch weather data by city
 fetch (WTTR_IN_ENDPOINT)
    .then(response=> response.json())
    .then(data=> console.log(data))

// HEROKUAPP fetch quotes data 
fetch (HEROKUAPP_ENDPOINT)
    .then(response=> response.json())
    .then(data=> console.log(data))