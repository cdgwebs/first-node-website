const express = require('express');
const path = require('path');

const app = express();

const port = 30;

const bootstrapfolder = '';
//const bootstrapfolder = '/bootstrap-examples/floating-labels';

app.use(express.static(path.join(__dirname, `./static${bootstrapfolder}`)));

app.get('/', (request, response) => {
    response.sendFile(
        path.join(__dirname, `./static${bootstrapfolder}/index.html`)
    );
});

app.get('/speakers', (request, response) => {
    response.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});