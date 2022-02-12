const mongoose = require('mongoose');
const Video = require('./Video');
const Fux = require('./Fux');

mongoose.connect('mongodb://127.0.0.1/jav2');

const limit = 40;

const getVideos = async (page, search) => new Promise((resolve) => {
    if (page < 1) {
        page = 1;
    }

    const skip = (page - 1) * (limit);
    let cmd;
    const isHasSearch = search != undefined && typeof(search) == 'string';
    if (isHasSearch) {
        cmd = Video.find({$text: {$search: search}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}, _id:-1})
    } else {
        cmd = Video.find({}).sort({_id:-1})
    }

    cmd.skip(skip).limit(limit).exec( (err, videos) => {
        if (err) {
            console.log(err);
        }
        const resolveCountQuery = (err, count) => {
            data = videos == undefined ? [] : videos;
            if (err) {
                console.log(err);
                count = 0;
            }
            resolve({
                max_page: Math.ceil(count / limit),
                data: data,
            });
        };
        if (isHasSearch) {
            Video.countDocuments({$text: {$search: search}}, resolveCountQuery);
        } else {
            Video.countDocuments({}, resolveCountQuery);
        }
    });
});

const getVideoByCode = async (code) => new Promise((resolve) => {
    const cmd = Video.findOne({'code': code});
    cmd.exec( (err, video) => {
        if (err) {
            console.log(err);
            resolve(undefined);
        } else {
            resolve(video == null ? undefined : video);
        }
    });
});

const getFuxes = async (page, search) => new Promise((resolve) => {
    if (page < 1) {
        page = 1;
    }

    const skip = (page - 1) * (limit);
    let cmd;
    const isHasSearch = search != undefined && typeof(search) == 'string';
    if (isHasSearch) {
        cmd = Fux.find({$text: {$search: search}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}, _id:-1})
    } else {
        cmd = Fux.find({}).sort({_id:-1})
    }

    // db.videos.find({$text: {$search: 'Minami'}}, {score: {$meta: 'textScore'}}).pretty().sort({score: {$meta: 'textScore'}})
    cmd.skip(skip).limit(limit).exec( (err, fuxes) => {
        if (err) {
            console.log(err);
        }
        const resolveCountQuery = (err, count) => {
            data = fuxes == undefined ? [] : fuxes;
            if (err) {
                console.log(err);
                count = 0;
            }
            resolve({
                max_page: Math.ceil(count / limit),
                data: data,
            });
        };
        if (isHasSearch) {
            Fux.countDocuments({$text: {$search: search}}, resolveCountQuery);
        } else {
            Fux.countDocuments({}, resolveCountQuery);
        }
    });
});

const getFuxByCode = async (code) => new Promise((resolve) => {
    const cmd = Fux.findOne({'code': code});
    cmd.exec( (err, fux) => {
        if (err) {
            console.log(err);
            resolve(undefined);
        } else {
            console.log(fux);
            resolve(fux == null ? undefined : fux);
        }
    });
});

const saveVideoItemToDB = (item) => {
    const video = new Video({
        code: item.code,
        title: item.title,
        imageLink: item.imageLink,
        actor: item.actor,
        iconLink: item.iconLink,
        file: item.file,
    });
    Video.countDocuments({code: item.code}, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            if (count == 0 && !item.code.includes('//')) {
                console.log(item);
                video.save();
            }
            
        }
    });
}
const saveFuxItemToDB = (item) => {
    const fux = new Fux({
        code: item.code,
        title: item.title,
        imageLink: item.imageLink,
        iconLink: item.iconLink,
        file: item.file,
    });
    Video.countDocuments({code: item.code}, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            if (count == 0) {
                fux.save();
            }
        }
    });
}

module.exports = {
    getFuxes,
    getFuxByCode,
    getVideos,
    getVideoByCode,
    saveVideoItemToDB,
    saveFuxItemToDB,
}
