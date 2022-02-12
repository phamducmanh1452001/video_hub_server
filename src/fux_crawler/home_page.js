const { loadHtml } = require('./common');

const getVideoItemsByHomePage = (page) => new Promise((resolve) => {
    scrapeHtml(`https://fuxporn.com/page/${page}.html`)
    .then(items => {
        resolve(items);
    });
});

const scrapeHtml = url => new Promise((resolve) => {
    loadHtml(url)
    .then($ => {
        const itemClass = $('div[class="thumb_wrap"]').find('a');
        let items = [];
        for (const [key, value] of Object.entries(itemClass)) {
            
            let attribs = value.attribs
            if (attribs == undefined) {
                continue;
            }
            const image = $(value).find('img').attr('data-lazy-src');
            items.push({
                link: attribs.href,
                iconLink: image,
            });
        }

        resolve(items);
    });
});

module.exports = {
    getVideoItemsByHomePage,
}