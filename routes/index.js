const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = (params) => {
    router.get('/', (request, response) => {
        if (!request.session.visitCount) {
            request.session.visitCount = 0;
        }
        request.session.visitCount += 1;
        console.log(`Visit count is: ${request.session.visitCount}`);
        response.render('index', { pageTitle: 'Welcome' });
    });

    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
};