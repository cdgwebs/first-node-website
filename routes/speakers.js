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
        const allArtwork = await speakerService.getAllArtwork();
        response.render('layout', {
            pageTitle: 'Speakers',
            template: 'speakers',
            speakers,
            allArtwork,
        });
    });

    router.get('/:shortname', async(request, response) => {
        const speaker = await speakerService.getSpeaker(request.params.shortname);
        const speakerArt = await speakerService.getArtworkForSpeaker(
            request.params.shortname
        );
        const allArtwork = await speakerService.getAllArtwork();
        response.render('layout', {
            pageTitle: 'Speakers',
            template: 'speakers-detail',
            speaker,
            speakerArt,
            allArtwork,
        });
    });

    return router;
};