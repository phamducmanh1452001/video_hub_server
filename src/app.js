const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const https = require('https');
const fs = require('fs');
const privateKey  = fs.readFileSync('src/ujav_xyz_privkey.key', 'utf8');
const certificate = fs.readFileSync('src/ujav_xyz_certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

// debug middle
app.use('/api', (req, res, next) => {
  console.log(req.socket.remoteAddress);
  next();
});

// default middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./router'));
app.use('/', express.static('./public'));

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: './public'});
});

const server = https.createServer(credentials, app);
server.listen(443, () => {
    console.log('Listening on port ' + server.address().port);
});
// mongoimport --db ujav --collection videos --file videos.json
// mongoimport --db ujav --collection fuxes --file fuxes.json
