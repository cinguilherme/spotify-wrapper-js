// eslint-disable-next-line import/no-extraneous-dependencies
global.fetch = require('node-fetch');

const oauth = 'BQDYMWEIVTiL6TrP17l58fX6oNfxZPE7O8QCLf3GCBp7t7km3-s_vW9Apn86zppvHfK_LLfigDU1tpQpTJ0a8cdBFL-HJU7ulSWRM8WppVMMVKozkgjCUjKbsi2JW9iyzn7duPNdoXJaPAX6BFbH';

const processChunks = (body, callback) => {
  const data = [];
  const outbuff = body;
  outbuff.on('data', (chunk) => {
    data.push(chunk);
  }).on('end', () => {
    const buffer = Buffer.concat(data);
    callback(buffer);
    // eslint-disable-next-line no-console
  }).catch(err => console.log(err));
};

const search = (artist = '', type = '', limit = 5, offset = 2) => {
  const meta = {
    Authorization: `Bearer ${oauth}`,
  };
  const processedType = type.split(',').join('%2C');

  // eslint-disable-next-line no-undef
  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${processedType}&limit=${limit}&offset=${offset}`, {
    headers: meta,
  });
};

const searchAlbuns = album => search(album, 'album');
const searchArtits = artist => search(artist, 'artist');
const searchPlaylist = query => search(query, 'playlist');
const searchTracks = query => search(query, 'track');

export { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks, processChunks };
