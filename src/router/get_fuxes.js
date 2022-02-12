const router = require('express').Router();
const dbcontainer = require('../dbcontainer');
const { FuxResponse } = require('./response');

router.get('/:page', function(req, res, next) {
    const page = req.params.page;
    const search = req.query.search;
    dbcontainer
    .getFuxes(page, search)
    .then(fuxes => {
        res.json(
            {
                'max_page': fuxes.max_page,
                'data': fuxes.data.map(fux => {
                    return new FuxResponse(fux);
                })
            }
        );
    });
});

module.exports = router;