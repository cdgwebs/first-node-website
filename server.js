const express = require('express');
const path = require('path');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const cookieSession = require('cookie-session');

const app = express();

const port = 3000;

app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        keys: ['ofhjadsgoihaig', 'asdkfhadoifh'],
    })
);
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

app.listen(port, () => {
    // Just to log the root path
    console.log(`Home directory: ${path.join(__dirname, './static')}`);
    console.log(`Express server listening on port ${port}`);
});

module.exports = () => {
    return app;
};