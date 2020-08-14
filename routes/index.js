const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = () => {
    router.get('/', (request, response) => {
        response.render('index', { pageTitle: 'Welcome' });
    });

    router.use('/speakers', speakersRoute());
    router.use('/feedback', feedbackRoute());

    return router;
};