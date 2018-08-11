var path = require("path");

// linking the data from the friends.js file where we have all our friends 
var friends = require("../data/friends.js");

module.exports = function(app) {

    // get function grabbing the array of friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // post function where we take user's input and calculate the difference
    // between user's score and friend's score
    app.post("/api/friends", function(req, res) {

        // user's input
        var userInput = req.body;

        // user's scores
        var userResponse = userInput.scores;

        // friend with the best score
        var friendName = "";
        var friendImage = "";

        // setting difference super high for comparison after we calculate
        // user's score
        var totalDiff = 1000;

        // pulls all friends from the array
        for (var i =0; i < friends.length; i++) {

            // starting point for calculating score of questions
            var diff = 0;

            // Math.abs() to calculate the absolute value of the friend matches'
            // scores and subtracting the user's score, leaving the best friend
            // match as the lowest value
            for (var j = 0; j < userResponse.length; j++) {
                diff += Math.abs(friends[i].score[j] - userResponse[j]);
            }

            console.log("difference = " + diff);

            // logging the results of the calculation and saving them to the variables
            if (diff < totalDiff) {

                console.log("Your closest friend match: " + diff);
                console.log("Friend name: " + friends[i].name);
                console.log("Friend image: " + friends[i].photo);

                totalDiff = diff;
                friendName = friends[i].name;
                friendImage = friends[i].photo;
            };
        };

        // add new user
        friends.push(userInput);

        // send response
        res.json({status: "ok", friendName: friendImage, friendImage: friendImage});


    });
};