
require("dotenv").config();


var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require('axios')
var inquirer = require('inquirer')
var moment = require('moment')


var searchTerm = process.argv.slice(3).join(" ");;
var searchType = process.argv[2];

function startLIRI () {

inquirer.prompt([

  {
    type: "list",
    name: "type",
    message: "what would you like to do?",
    choices: [
      "1- Search for a song on Spotify",
      "2- Search for a movie",
      "3- search for an artist's events",
      "4- Do what it says",
      "5- Exit LIRI"
    ]
  },
 
]).then(function(user) {
 
switch (user.type){
  case "1- Search for a song on Spotify":
      searchType = "spotify-this-song"
      break;
  case "2- Search for a movie":
      searchType = "movie-this"
      break;
  case "3- search for an artist's events":
      searchType = "concert-this"
      break;
  case "4- Do what it says":
      searchType = "do-what-it-says"
      break;
  case "5- Exit LIRI":
      searchType = "exit"
          break;
   default: "movie-this"   
}

if(searchType !== "exit" && searchType !== "do-what-it-says"){
inquirer.prompt([{
  type: "input",
  name: "term",
  message: "Enter search terms"
}

]).then(function(user) {


if(user.term){
  searchTerm = user.term

}

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
})
}

else if(searchType==="do-what-it-says") {

  doWhatItSays()

}
else {
  console.log("Goodbye!")
}
})

}

function movieThis(){
  
  axios.get('https://www.omdbapi.com/?t='+ searchTerm+ '&y=&plot=short&apikey=' + process.env.OMDB)
  .then(function(response) {
    var holdData = []
      var separator = "------------------------------------------"

  var jsonData=  response.data
        console.log(separator)
        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("imdb Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        
        console.log("Actors: " + jsonData.Actors);
        console.log("\n\n\n");

         
        holdData.push(separator,"\n",
        "searchTerm: ", searchTerm,"\n",
        jsonData.Title,"\n", 
        jsonData.Year,"\n", 
        jsonData.imdbRating,"\n")

        fs.appendFile("log.txt", holdData + "---------", function(err) {
          if (err) throw err;
        }); 

        startLIRI() 
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
    .search({ type: 'track', query: searchTerm, limit: 5 })
    .then(function(response) {
      var holdData = ["searchTerm: ", searchTerm,"\n"]
      var separator = "------------------------------------------"
      for(var i =0; i < response.tracks.items.length; i++){
          console.log(separator)
          console.log("Name: " + response.tracks.items[i].name)
          console.log("Album Name: " + response.tracks.items[i].album.name)
          console.log("Preview URL: " + response.tracks.items[i].preview_url)
          console.log("Artists: " + response.tracks.items[i].artists[0].name)   
          
          holdData.push(separator,"\n",  
          response.tracks.items[i].name,"\n", 
          response.tracks.items[i].album.name,"\n", 
          response.tracks.items[i].artists[0].name,"\n")

        }

        fs.appendFile("log.txt", holdData + "---------", function(err) {
          if (err) throw err;
        });  

        startLIRI() 
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function concertThis()
  {axios.get('https://rest.bandsintown.com/artists/' + searchTerm + '/events?app_id=' + process.env.BIT)
  .then(function(response) {

    var holdData = ["searchTerm: ", searchTerm,"\n"]
      var separator = "------------------------------------------"
      for(var i =0; i < response.data.length; i++){
        holdData.push(separator,"\n",
          response.data[i].venue.name,"\n", 
          response.data[i].venue.city,"\n", 
          response.data[i].datetime,"\n")

          var datetime =  moment(response.data[i].datetime, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS).format('DD-MM-YYYY HH:mm:ss');

        console.log(separator)
        console.log("Venue: " + response.data[i].venue.name);
        console.log("City: " + response.data[i].venue.city);
        console.log("Date: " + datetime);       
  }
  fs.appendFile("log.txt", holdData + "---------", function(err) {
    if (err) throw err;
  }); 
  startLIRI() 
  
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
    fs.readFile("random.txt","utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;
    
 
        processFile();          // put the next step in a function and invoke it
    });
    
    function processFile() {

      var slice = content.split(",")
      console.log(content);
      searchType= slice[0];
      searchTerm = slice[1].replace(/['"]+/g, '');

      switch (searchType){
        case "spotify-this-song":
          spotifyThis();
          break;   
        case "concert-this":
          concertThis();
            break;   
        case "movie-this":
          movieThis();
           break;
        default:
          searchTerm = "Mr. Nobody"
          spotifyThis();   
      }


    }
  }

  startLIRI() 