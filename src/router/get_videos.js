const router = require('express').Router();
const dbcontainer = require('../dbcontainer');
const { VideoResponse } = require('./response');

router.get('/:page', function(req, res, next) {
    const page = req.params.page;
    const search = req.query.search;
    dbcontainer
    .getVideos(page, search)
    .then(videos => {
        res.json(
            {
                'max_page': videos.max_page,
                'data': videos.data.map(video => {
                    return new VideoResponse(video, false);
                })
            }
        );
    });
});

module.exports = router;