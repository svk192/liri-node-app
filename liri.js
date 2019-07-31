
require("dotenv").config();


var keys = require("./keys.js");


var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios')

var searchTerm = process.argv.slice(3).join(" ");;
var searchType = process.argv[2];


if(!searchType){
  searchTerm  = "Mr. Nobody";
  movieThis()

}

else if(searchType==="spotify-this-song") {
  spotifyThis()
}


else if(searchType==="concert-this") {
  concertThis()   

}
else if(searchType==="movie-this") {

  movieThis()
}
else if(searchType==="do-what-it-says") {

  doWhatItSays()

}


function movieThis(){
  
  axios.get('https://www.omdbapi.com/?t='+ searchTerm+ '&y=&plot=short&apikey=9aa7958d')
  .then(function(response) {
  
  var jsonData=  response.data
  // console.log(jsonData)
  // If the axios was successful...
      // Then log the body from the site!
      // for(var i =0; i < jsonData.length; i++){
        console.log("------------------------------------------")
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("imdb Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        
        console.log("Actors: " + jsonData.Actors);
  
        console.log("------------------------------------------")      
  // }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}


function spotifyThis() {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: 'track', query: searchTerm, limit: 30 })
    .then(function(response) {
  
      for(var i =0; i < response.tracks.items.length; i++){
          console.log("------------------------------------------")
          console.log("Name: " + response.tracks.items[i].name)
          console.log("Album Name: " + response.tracks.items[i].album.name)
          console.log("Preview URL: " + response.tracks.items[i].preview_url)
          console.log("Artists: " + response.tracks.items[i].artists[0].name)
          console.log("------------------------------------------")      
  }
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function concertThis()
  {axios.get('https://rest.bandsintown.com/artists/' + searchTerm + '/events?app_id=codingbootcamp')
  .then(function(response) {
      // If the axios was successful...
      // Then log the body from the site!
      // console.log(response.data[0])
      
      for(var i =0; i < response.data.length; i++){
        console.log("------------------------------------------")
        // console.log(response);
        console.log("Venue: " + response.data[i].venue.name);
        console.log("City: " + response.data[i].venue.city);
        console.log("Date: " + response.data[i].datetime);
        console.log("------------------------------------------")      
  }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }

  function  doWhatItSays(){

    var content;
    // First I want to read the file
    fs.readFile("random.txt", function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;
    
        // Invoke the next step here however you like
        console.log(content);   // Put all of the code here (not the best solution)
        processFile();          // Or put the next step in a function and invoke it
    });
    
    function processFile() {
        console.log(content);
    }
  }