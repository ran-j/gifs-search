'use strict';

import Request from 'request';

var api = {
    keyApp : 'R',
    giphy: {
        search: {
            url: (keywords, apiKey) => {
                return [
                    'http://api.giphy.com/v1/gifs/search?',
                    `q=${encodeURI(keywords)}`,
                    `&api_key=${apiKey}&limit=1`,
                    '&offset=0'
                ].join('');
            },
            imageUrl: (data) => (
                data.data[0].images['fixed_height'].url
            )
        },
        random: {
            url: (keywords, apiKey) => {
                return [
                    'http://api.giphy.com/v1/gifs/random?',
                    `tag=${encodeURI(keywords)}`,
                    `&api_key=${apiKey}&limit=1`,
                    '&offset=0'
                ].join('');
            },
            imageUrl: (data) => (
                data.data.image_url
            )
        }
    }
};

/**
 * Search for a gif using GiphyApi
 */
module.exports = {
    apiKey : (key) => { 
        return api.keyApp = key;
    },
    query: (input) => {
        const searchApi = api.giphy.search;

        return new Promise((resolve, reject) => {
            Request(
                searchApi.url(input, api.keyApp),
                (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else if (response.statusCode === 200) {
                        resolve(
                            searchApi.imageUrl(
                                JSON.parse(body)
                            )
                        );
                    } else {
                        reject(err);
                    }
                }
            );
        });
    },
    random: (input) => {
        const randomApi = api.giphy.random;

        return new Promise((resolve, reject) => {
            Request(
                randomApi.url(input, api.keyApp),
                (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else if (response.statusCode === 200) {
                        resolve(
                            randomApi.imageUrl(
                                JSON.parse(body)
                            )
                        );
                    } else {
                        reject(err);
                    }
                }
            );
        });
    }
};
