const express = require('express');

const router = express.Router();
//const FeedbackService = require('../services/FeedbackService');

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = (params) => {
    const { feedbackService } = params;

    router.get('/', async(request, response) => {
        const feedback = await feedbackService.getList();
        return response.json(feedback);
    });

    router.post('/', (request, response) => {
        return response.send('Feedback form posted');
    });

    return router;
};