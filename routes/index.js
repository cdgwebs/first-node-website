const express = require('express');

const router = express.Router();

/*  This is really cool using the arrow function because
    you can pass params with this module.export
*/
module.exports = () => {
    router.get('/', (request, response) => {
        response.render('index', { pageTitle: 'Welcome' });
    });
    return router;
};