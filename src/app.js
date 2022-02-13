const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

// debug middle
// app.use('/api', (req, res, next) => {
//   console.log(req.path);
//   next();
// });
// default middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./router'));
app.use('/', express.static('./public'));

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: './public'});
});

const server = app.listen( process.env.PORT || 80, () => {
    console.log('Listening on port ' + server.address().port);
});
// mongoimport --db ujav --collection videos --file videos.json
// mongoimport --db ujav --collection fuxes --file fuxes.json
