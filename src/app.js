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
  res.sendFile('index.html', {root: '/Users/manhblue/Desktop/video_hub/public'});
});

const server = app.listen( process.env.PORT || 3000, '192.168.1.61', () => {
    console.log('Listening on port ' + server.address().port);
});
