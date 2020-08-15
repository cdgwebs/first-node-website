const express = require('express');
const path = require('path');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Middleware
app.use(express.static(path.join(__dirname, './static')));

app.use(
    '/',
    routes({
        feedbackService: feedbackService,
        speakerService: speakerService,
    })
);

/*
app.get('/speakers', (request, response) => {
    response.sendFile(path.join(__dirname, './static/speakers.html'));
});
*/

app.listen(port, () => {
    // Just to log the root path
    console.log(`Home directory: ${path.join(__dirname, './static')}`);
    console.log(`Express server listening on port ${port}`);
});

module.exports = () => {
    return app;
};