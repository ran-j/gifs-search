import gifSearch from './../dist/gif-search.min';
import test from 'ava';

gifSearch.apiKey("3XHgNK953tmBjosVWO1IGR5q3eL0vU5i")

const isValidGifUrl = (url) => (
    url.match(/\/.*?.gif/g) ? true : false
);

test('Gif search', async t => {
    const response = gifSearch.query('cat');
    const gifUrl = await response;

    t.true(isValidGifUrl(gifUrl));
});

test('Random gif search', async t => {
    const response1 = gifSearch.random('cat');
    const response2 = gifSearch.random('cat');
    const gifUrl1 = await response1;
    const gifUrl2 = await response2;

    t.true(isValidGifUrl(gifUrl1));
    t.true(isValidGifUrl(gifUrl2));
    t.true(gifUrl1 !== gifUrl2);
});
