//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var index = require('../controllers/index.server.controller');

    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/addSurvey', function (req, res) {
        res.render('addSurvey');
    });
    app.get('/listSurvey', function (req, res) {
        index.listSurvey(req, res);
    });

    app.post('/survey', function (req, res) {
        index.addSurvey(req, res);
    });
    app.get('/survey', function (req, res) {
        index.listAllSurvey(req, res);
    });
    app.route('/survey/:surveyId').put(index.updateBySurveyId);
    app.param('surveyId', function (req, res) {
        index.updateBySurveyId(req, res);
    });
};