const { getVideoItemsByHomePage } = require('./home_page');
const { getVideoCodeLinkByUrl } = require('./movie_play');
const { saveFuxItemToDB } = require('../dbcontainer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const crawl = () => {
    console.log('crawling...');
    getVideoItemsByHomePage(1)
    .then((items) => {
        items.forEach(item => {
            sleep(1000).then(
                getVideoCodeLinkByUrl(item.link)
                .then(res => {
                    item.code = res.code;
                    item.title = res.title.split(' | ')[0];
                    console.log(item);
                    saveFuxItemToDB(item);
                })
            );
        });
    });
    getVideoItemsByHomePage(2)
    .then((items) => {
        items.forEach(item => {
            sleep(1000).then(
                getVideoCodeLinkByUrl(item.link)
                .then(res => {
                    item.code = res.code;
                    item.title = res.title.split(' | ')[0];
                    console.log(item);
                    saveFuxItemToDB(item);
                })
            );
        });
    });
    // for (var i = 1; i <= 23; i++) {
    //     (function(i) {
    //         setTimeout(function() {
    //             console.log(`page: ${i}`);
    //             getVideoItemsByHomePage(i)
    //             .then((items) => {
    //                 items.forEach(item => {
    //                     sleep(Math.floor(Math.random() * 800)).then(
    //                         getVideoCodeLinkByUrl(item.link)
    //                         .then(res => {
    //                             item.code = res.code;
    //                             item.title = res.title.split(' | ')[0];
    //                             console.log(item);
    //                             saveFuxItemToDB(item);
    //                         })
    //                     );
    //                 });
    //             });
    //         }, (24 - i) * 2000);
    //     }(i));
    // }
}


module.exports = {
    crawl,
}