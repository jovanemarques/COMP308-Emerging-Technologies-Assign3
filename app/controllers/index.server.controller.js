//This function handles the following task:
//captures the form input and passes it to display.ejs page for friendly output
// exports.displayInfo = function (req, res) {
//     //get user input using request object
//     var email = req.body.email;
//     //make a reference to the session object
//     var session = req.session;
//     //store the username in session object
//     session.email = email;
//     console.log("email in session: " + session.email);
//     //show the display.ejs page and pass username to it
//     res.render('display', {
//         email: email
//     });

// }; //end of function

// exports.updateBySurveyId = function (req, res, next) {
//     // req.task = req.body //read the courses from request's body

//     //find the index of parameter that is sent in req.params array
//     //var surveyIndex = req.body.surveyId.indexOf(req.params.surveyId);
//     //create the json object with updated values
//     var surveyToUpdate = {
//         "surveyId": req.body.surveyId,
//         "gameGenre": req.body.gameGenre,
//         "daysPerYear": req.body.daysPerYear,
//         "age": req.body.age,
//     }
    
//     //initialize findOneAndUpdate method arguments
//     var query = { "surveyId": req.params.surveyId };
//     var update = surveyToUpdate;
//     var options = { new: true };

//     var Survey = require('mongoose').model('Survey');

//     // Use the 'Task' static 'findOneAndUpdate' method 
//     // to update a specific task by task id
//     Survey.findOneAndUpdate(query, update, options, (err, survey) => {
//         if (err) {
//             console.log(err);
//             // Call the next middleware with an error message
//             return next(err);
//         } else {
//             console.log(survey);
        
//             // Use the 'response' object to send a JSON response
//             //res.redirect('/list_tasks'); //display all tasks
//             res.send(survey); //display all tasks
//         }
//     })
// };

//update a task by task id
exports.updateBySurveyId = function (req, res, next) {
    req.survey = req.body //read the courses from request's body

    //find the index of parameter that is sent in req.params array
    var surveyIndex = req.body.surveyId.indexOf(req.params.surveyId);
    //create the json object with updated values
    var surveyToUpdate = {
        "surveyId": req.params.surveyId,
        "gameGenre": req.body.gameGenre[surveyIndex],
        "daysPerYear": req.body.daysPerYear[surveyIndex],
        "age": req.body.age[surveyIndex],
    }
    
    //initialize findOneAndUpdate method arguments
    var query = { "surveyId": req.params.surveyId };
    var update = surveyToUpdate;
    var options = { new: true };

    var Survey = require('mongoose').model('Survey');

    Survey.findOneAndUpdate(query, update, options, (err, survey) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(survey);
        
            // Use the 'response' object to send a JSON response
            res.redirect('/listSurvey'); //display all tasks
        }
    })
};

exports.addSurvey = function (req, res, next) {
    var Survey = require('mongoose').model('Survey');
    var survey = new Survey(req.body); 
    survey.save(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/listSurvey');
        }
    }); 
}

exports.listAllSurvey = function (req, res, next) {
    var Survey = require('mongoose').model('Survey');
    Survey.find({}, (err, survey) => {
        if (err) {
            return getErrorMessage(err);
        }
        if (survey){
            return res.send(survey);
            // res.render('survey', {
            //     survey: survey 
            // });
        } else {
            return res.send('No survey found.')
        }
    });
}
exports.listSurvey = function (req, res, next) {
    var Survey = require('mongoose').model('Survey');
    Survey.find({}, (err, surveys) => {
        if (err) {
            return getErrorMessage(err);
        }
        if (surveys){
            // return res.send(survey);
            return res.render('listSurvey', {
                surveys: surveys 
            });
        } else {
            return res.send('No survey found.')
        }
    });
}