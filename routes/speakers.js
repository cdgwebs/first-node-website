const express = require('express');

const router = express.Router();

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = () => {
    router.get('/', (request, response) => {
        return response.send('Speakers list');
    });

    router.get('/:shortname', (request, response) => {
        return response.send(`Details of page ${request.params.shortname}`);
    });

    return router;
};