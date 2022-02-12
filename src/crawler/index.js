const { getVideoItemsByHomePage } = require('./home_page');
const { getSmartShareLinkByItemLink, getOriginLinkFromSmartShare } = require('./movie_play');
const { saveVideoItemToDB } = require('../dbcontainer');

module.exports = {
    getVideoItemsByHomePage,
    getSmartShareLinkByItemLink,
    getOriginLinkFromSmartShare
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

crawler();


function crawler() {
    console.log('crawling...');
    getVideoItemsByHomePage(1)
    .then((items) => {
        items.forEach(item => {
            sleep(100).then(
                getSmartShareLinkByItemLink(item.videoLink)
                .then(res => {
                    item.actor = res.actor;
                    item.code = res.smartShareLink.replace('https://smartshare.tv/v/', '');
                    item.imageLink = res.imageLink;
                    saveVideoItemToDB(item);
                })
            );
        });
    });
    // for (var i = 1; i <= 206; i++) {
    //     (function(i) {
    //         setTimeout(function() {
    //             console.log(`page: ${i}`);
    //             getVideoItemsByHomePage(i)
    //             .then((items) => {
    //                 items.forEach(item => {
    //                     sleep(2000).then(
    //                         getSmartShareLinkByItemLink(item.videoLink)
    //                         .then(res => {
    //                             item.actor = res.actor;
    //                             item.code = res.smartShareLink.replace('https://smartshare.tv/v/', '');
    //                             item.imageLink = res.imageLink;
    //                             console.log(item);
    //                             saveVideoItemToDB(item);
    //                         })
    //                     );
    //                 });
    //             });
    //         }, (207 - i) * 6000);
    //     }(i));
    // }
}


// getOriginLinkFromSmartShare('https://smartshare.tv/v/xd-pyf5eq2mpmxd')
// .then(file => {
//     console.log(file)
// });

// const url = 'https://javleak.com/cjod-174/';
// getSmartShareLinkByItemLink(url)
// .then(res => {
//     console.log(res);
// });