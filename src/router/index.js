const router = require('express').Router();

router.use('/api/jav/page', require('./get_videos'));
router.use('/api/jav/code', require('./get_video_by_code'));

router.use('/api/uav/page', require('./get_fuxes'));
router.use('/api/uav/code', require('./get_fux_by_code'));

module.exports = router;