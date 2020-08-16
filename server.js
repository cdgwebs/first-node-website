const express = require('express');
const path = require('path');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const cookieSession = require('cookie-session');

const app = express();

const port = 3000;

app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        keys: ['ofhjadsdgoihaig', 'asdkfhaddoifh'],
    })
);

// For form parsing of body
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Middleware
app.use(express.static(path.join(__dirname, './static')));

app.use(async(request, response, next) => {
    try {
        const names = await speakerService.getNames();
        response.locals.speakerNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
});

app.locals.siteName = 'ROUX Meetups';

app.use(
    '/',
    routes({
        feedbackService: feedbackService,
        speakerService: speakerService,
    })
);

// Catch all for 404
app.use((request, response, next) => {
    return next(createError(404, 'File Not Found'));
});

app.use((err, request, response, next) => {
    response.locals.message = err.message;
    console.log(response.locals.message);
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    // This is the actual page
    response.render('error');
});

app.listen(port, () => {
    // Just to log the root path
    console.log(`Home directory: ${path.join(__dirname, './static')}`);
    console.log(`Express server listening on port ${port}`);
});

module.exports = () => {
    return app;
};