const { loadHtml } = require('./common');

class VideoItem {
    constructor(videoLink, iconLink, title, actor, imageLink) {
        this.videoLink = videoLink;
        
        this.iconLink = iconLink;
        this.title = title;
        this.actor = actor;

        this.imageLink = imageLink;
    }
}

const scrapeHtml = url => new Promise((resolve) => {
    loadHtml(url)
    .then($ => {
        const itemClass = $('div[class="item"]');
        const videoItems = [];

        for (const [key, value] of Object.entries(itemClass)) {
            const subQuery = $(value)
            const videoLink = subQuery.find('a').attr('href');
            const iconLink = subQuery.find('img').attr('src');
            const title = subQuery.find('h2');
            
            // console.log('\n', title.text(), '\n', imageLink, '\n', videoLink, '\n');

            if (iconLink != undefined && videoLink != undefined) {
                const videoItem = new VideoItem(videoLink, iconLink, title.text());
                videoItems.push(videoItem);
            }
        }

        resolve(videoItems);
    });
});

const getVideoItemsByHomePage = (page = 1) => new Promise((resolve) => {
    const url = 'https://javleak.com' + (page != 1 ? `/page/${page}/` : '');
    scrapeHtml(url)
    .then(data => {
        resolve(data);
    });
});

module.exports = {
    getVideoItemsByHomePage
};