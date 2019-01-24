global.fetch = require('node-fetch');

const oauth = 'BQDYMWEIVTiL6TrP17l58fX6oNfxZPE7O8QCLf3GCBp7t7km3-s_vW9Apn86zppvHfK_LLfigDU1tpQpTJ0a8cdBFL-HJU7ulSWRM8WppVMMVKozkgjCUjKbsi2JW9iyzn7duPNdoXJaPAX6BFbH';

const processChunks = (body, callback) => {
  const data = [];
  const outbuff = body;
  let obj = {};
  outbuff.on('data', (chunk) => {
    data.push(chunk);
  }).on('end', () => {
    const buffer = Buffer.concat(data);
    obj = buffer.toString('utf-8');
    callback(obj);
  });
};

const search = (artist = '', type = '') => {
  const meta = {
    'Authorization': 'Bearer ' + oauth,
  };
  const processedType = type.split(',').join('%2C');

  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${processedType}&limit=5&offset=2`, {
    headers: meta,
  });
};

const searchAlbuns = album => search(album, 'album');
const searchArtits = artist => search(artist, 'artist');
const searchPlaylist = query => search(query, 'playlist');
const searchTracks = query => search(query, 'track');

export { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks, processChunks };
