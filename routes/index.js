const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = (params) => {
    const { speakerService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const topSpeakers = await speakerService.getList();
            const allArtwork = await speakerService.getAllArtwork();
            /* // Can be used for storing session variables
                      if (!request.session.visitCount) {
                          request.session.visitCount = 0;
                      }
                      request.session.visitCount += 1;
                      console.log(`Visit count is: ${request.session.visitCount}`);
                  */
            return response.render('layout', {
                pageTitle: 'Welcome',
                template: 'index',
                topSpeakers,
                allArtwork,
            });
        } catch (err) {
            return next(err);
        }
    });

    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
};