
const express = require('express');
const config = require('./config.js');

const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

// connect to mongodb database
const db_url = `mongodb://localhost:27017/lineup`;
const db_name = 'lineup'

// Sign up the user
router.post('/user/sign_up', (request, response) => {

    // Get users email, username, password
    let email = request.body.email
    let username = request.body.username
    let password = request.body.password

    let user = {
        email: email,
        username: username,
        password: password,
        calendar: new Array(336).fill(null),
        friends: []
    };

    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email, username: username };
        dbo.collection("users").find(query).toArray(function (err, result) {

            if (err) throw err;

            // If the email or username exists
            if (result.length > 0) {

                db.close()

                response.json({

                    // Failed
                    status: 0,

                })

                return

            }

            // Save email, password and username to DB
            dbo.collection("users").insertOne(user, function (err, res) {

                if (err) throw err;

                // Return

                response.json(user)

                db.close();

            });

        });
    });

});

// Add to user calendar
router.post('/user/update_calendar', (request, response) => {

    // Get users email
    let email = request.body.email
    let item = request.body.item
    let calendar_index = request.body.calendar_index

    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email };
        dbo.collection("users").find(query).toArray(function (err, result) {

            if (err) throw err;

            // If the email or username exists
            if (result.length > 0) {

                let calendar = result[0].calendar
                calendar[calendar_index] = item

                let newvalues = { $set: { calendar: calendar } };

                dbo.collection("users").updateOne(query, newvalues, function (err, res) {

                    if (err) throw err;

                    db.close();

                });

                response.json({

                    // Failed
                    calendar: calendar,

                })

                return
            }

            db.close()

            response.json({

                // Failed
                status: 0,

            })

        });
    });

});

// Add to user calendar
router.post('/user/read_calendar', (request, response) => {

    // Get users email
    let email = request.body.email

    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email };
        dbo.collection("users").find(query).toArray(function (err, result) {

            if (err) throw err;

            let calendar = []

            // If the email or username exists
            if (result.length > 0) {

                calendar = result[0].calendar

            }

            db.close()

            response.json({

                calendar: calendar,

            })

        });
    });

});

// Get recommendation for user
router.post('/user/recommendation', (request, response) => {

    // Get users email
    let email = request.body.email

    function get_friend_calendar(query) {
        return new Promise(function (resolve, reject) {

            MongoClient.connect(db_url, function (err, db) {
                if (err) throw err;
                let dbo = db.db(db_name);

                artistinfo = dbo.collection("users").find(query)
                    .toArray(function (err, result) {

                        if (err) throw reject(err);
                        resolve(result);
                    });

            });
        });
    };


    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email };
        dbo.collection("users").find(query).toArray(async function (err, result) {

            if (err) throw err;
            let matching_times = []

            // If the email or username exists
            if (result.length > 0) {

                let calendar = result[0].calendar
                let friends = result[0].friends

                for (let i = 0; i < friends.length; i++) {

                    let query = { username: friends[i] };

                    let friend_calendar = await get_friend_calendar(query)
                    friend_calendar = friend_calendar[0].calendar

                    for (let j = 0; j < friend_calendar.length; j++) {

                        if (friend_calendar[j] == null && friend_calendar[j] == calendar[j]) {

                            matching_times.push(j)

                        }

                    }

                    console.log(friend_calendar)
                }

                response.json({

                    matching_times: matching_times,

                })

                return
            }

            db.close()

            response.json({

                // Failed
                status: 0,

            })

        });
    });

});

// Add to user friends
router.post('/user/add_friend', (request, response) => {

    // Get users email and friend_username
    let email = request.body.email
    let friend_username = request.body.friend_username

    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email };
        dbo.collection("users").find(query).toArray(function (err, result) {

            if (err) throw err;

            // If the email or username exists
            if (result.length > 0) {

                let friends = result[0].friends

                if (friends.includes(friend_username) == false) {
                    friends.push(friend_username)
                }

                let newvalues = { $set: { friends: friends } };

                dbo.collection("users").updateOne(query, newvalues, function (err, res) {

                    if (err) throw err;

                    db.close()

                });

                response.json({

                    friends: friends,

                })

                return
            }

            db.close()

            response.json({

                // Failed
                status: 0,

            })

        });
    });

});

// Remove user friend
router.post('/user/remove_friend', (request, response) => {

    // Get users email and friend_username
    let email = request.body.email
    let friend_username = request.body.friend_username

    // Check if email & username exists
    MongoClient.connect(db_url, function (err, db) {
        if (err) throw err;
        let dbo = db.db(db_name);
        let query = { email: email };
        dbo.collection("users").find(query).toArray(function (err, result) {

            if (err) throw err;

            // If the email or username exists
            if (result.length > 0) {

                Array.prototype.remove = function () {
                    var what, a = arguments, L = a.length, ax;
                    while (L && this.length) {
                        what = a[--L];
                        while ((ax = this.indexOf(what)) !== -1) {
                            this.splice(ax, 1);
                        }
                    }
                    return this;
                };

                let friends = result[0].friends
                friends.remove(friend_username)

                let newvalues = { $set: { friends: friends } };

                dbo.collection("users").updateOne(query, newvalues, function (err, res) {

                    if (err) throw err;

                    db.close()

                });

                response.json({

                    friends: friends,

                })

                return
            }

            db.close()

            response.json({

                // Failed
                status: 0,

            })

        });
    });

});


module.exports = router; 