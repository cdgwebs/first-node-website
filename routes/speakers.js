const express = require('express');

const router = express.Router();
//const SpeakerService = require('../services/SpeakerService');

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = (params) => {
    const { speakerService } = params;

    router.get('/', async(request, response) => {
        const speakers = await speakerService.getList();
        return response.json(speakers);
    });

    router.get('/:shortname', (request, response) => {
        return response.send(`Details of page ${request.params.shortname}`);
    });

    return router;
};