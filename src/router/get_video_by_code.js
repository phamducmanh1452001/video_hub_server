const router = require('express').Router();
const dbcontainer = require('../dbcontainer');
const { VideoResponse } = require('./response');

let cachedVideosByCode = new Map();

router.get('/:code', function(req, res, next) {
    const code = req.params.code;
    if (cachedVideosByCode.has(code)) {
        res.json(
            new VideoResponse(cachedVideosByCode.get(code), true)
        );
        return;
    }

    let video;

    dbcontainer
    .getVideoByCode(code)
    .then(value => {
        video = value;
        if (video == undefined) {
            console.log('Not found');
            res.status(404).json({
                'message': 'not found',
            });
        } else {
            res.json(
                new VideoResponse(video, true)
            );
        }
    });
  
});

module.exports = router;
