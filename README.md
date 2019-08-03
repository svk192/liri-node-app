# liri-node-app

- - -
## About LIRI

LIRI is a _Language_ Interpretation and Recognition Interface. It is a command line node app that takes in parameters and gives you back data. The app allows you to use the following APIs: 
 * Spotify for songs
 * Bands in Town for concerts 
 * OMDB for movies 
 

## How to use LIRI 

1) Open the terminal and make sure you are in LIRI's directory 

2) Install packages using the `npm i` command. A list of the packages used can be found under the **Technologies Used** section  

3) Run liri.js with the node command

4) LIRI will begin by asking you what you want to search for: 

 ![Results](/screencaps/start.png) 

You can enter a search term if you chose the spotify, movie or artist even option: 

 ![Results](/screencaps/Spotify Search.png)

It will display the results from the option you chose:

 ![Results](/screencaps/Spotify Result.png) 
 
 ![Results](/screencaps/Movie Result.png)

![Results](/screencaps/Bands Result.png)

You can also search for the item listed in the text file e.g. search spotify for "I want it that way"
  ![Results](/screencaps/Dowhat.png)

 And finally, it will exit when the user wants to quit the program. 
  ![Results](/screencaps/exit.png)

  
- - -

## TECHNOLOGIES USED

* Javascript
* Nodejs
* Node packages:
    * Inquirer
    * FS
    * Node-Spotify-API
    * Moment
    * DotEnv
    * Axios
* APIs used:
    * Bands in Town
    * OMDB
    * Spotify
* Git
* GitHub