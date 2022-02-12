const router = require('express').Router();
const axios = require('axios');
const http = require('http')
const https = require('https')

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
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(clientIp);
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
    
    getFileFromCode(code, clientIp)
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

const getFileFromCode = async (code, ip) => new Promise((resolve) => {
    const options = { localAddress: clientIp }
    const httpAgent = new http.Agent(options);
    const httpsAgent = new https.Agent(options);
    const uri = `https://smartshare.tv/api/source/${code}`;
    let items = [];
    axios
        .post(uri, { httpAgent, httpsAgent })
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
        
            resolve(files);
        });
});

module.exports = router;
