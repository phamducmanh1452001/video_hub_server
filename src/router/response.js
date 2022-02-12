class VideoResponse {
    constructor(video, isIncludeImageLink) {
        this.code = video.code;
        this.icon_link = video.iconLink;
        if (isIncludeImageLink) {
            this.image_link = video.imageLink;
        }        
        this.actor = video.actor;
        this.title = video.title;
        this.files = video.files;
    }
}

class FuxResponse {
    constructor(fux) {
        this.code = fux.code;
        this.icon_link = fux.iconLink;
        this.title = fux.title;
        this.files = fux.files;
        this.image_link = fux.imageLink;
    }
}

module.exports = {
    VideoResponse,
    FuxResponse
};