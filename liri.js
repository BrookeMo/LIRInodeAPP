// =====================================================================
// variables we need for npm
// =====================================================================
var config = require("./.env").config;
var dotenv = require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js")
var Twitter = require("twitter");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var request = require("request");
// =====================================================================
// inquirer prompt for the commands
// =====================================================================
inquirer
  .prompt([
    {
        type: "list",
        message: "Hi! I'm LIRI. What would you like me to do?",
        choices: ["Get My Tweets", "Spotify A Song", "Tell Me About A Movie", "Do What I Say"],
        name: "command"
      }
  ])

  .then(function(inquirerResponse) {
    if (command.choices === "Get My Tweets") {
        Twitter;
        var params = {screen_name: 'LIRI42119480'};
        client.get('statuses/user_timeline/count20', params, function(error, tweets, response) {
            if (!error) {
                for(var i = 0; i < tweets.length; i++){
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);
                }
            }
        });
    }
    if(command.choices === "Spotify A Song"){
        inquirer
        .prompt([
            {
                type:"input",
                message: "What is the name of the song?",
                name:"song"
            }
        ])
        //make call to spotify api
        .then(function(answer){
            var song = answer.song;
            spotify
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].href);
            });
        });
        if(command.choices === "movie-this"){
            inquirer
            .prompt([
                {
                    type:"input",
                    message: "What is the name of the movie?",
                    name:"title"
                }
            ])
            //make request to omdb api
            .then(function(answer){
                var title = answer.title;
                request("http://www.omdbapi.com/?t="+title+"&apikey=trilogy", function(error, response, body) {
    
                // If the request is successful (i.e. if the response status code is 200)display these responses to the console
                if (!error && response.statusCode === 200) {
    
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors)
                }
                });
                console.log(title);
            });
        };  
    });
  

