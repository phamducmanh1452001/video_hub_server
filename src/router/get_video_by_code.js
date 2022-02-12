const router = require('express').Router();
const axios = require('axios');
const request = require('request');
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
    let files;

    dbcontainer
    .getVideoByCode(code)
    .then(value => {
        video = value;
        if (video == undefined) {
            console.log('Not found');
            res.status(404).json({
                'message': 'not found',
            });
        } else if (files != undefined) {
            video.files = files;
            res.json(
                new VideoResponse(video, true)
            );
        }
    });
    
    getFileFromCode(code)
    .then(values => {
        if (video != undefined) {
            video.files = values;

            cachedVideosByCode.set(code, video);
            setTimeout(() => {
                cachedVideosByCode.delete(code);
            }, 1500 * 3600);

            res.json(
                new VideoResponse(video, true)
            );
        } else {
            files = values;
        }
    });
});

const getFileFromCode = async (code) => new Promise((resolve) => {
    const uri = `https://smartshare.tv/api/source/${code}`;
    let items = [];
    axios
        .post(uri)
        .then(_res => {
            items = _res.data.data;
        })
        .catch(err => {
            resolve(undefined);
        })
        .then(() => {
            if (items == undefined) {
                console.log('files are undefined');
                return;
            }
            let files = {
                '1080p': '',
                '720p': '',
                '480p': '', 
            };

            for(let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.label == '1080p') {
                    files['1080p'] = item.file;
                } else if (item.label == '720p') {
                    files['720p'] = item.file;
                } else {
                    files['480p'] = item.file;
                }
            }
        });
});

module.exports = router;
