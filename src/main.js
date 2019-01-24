const search = (artist = '', type = '') => {
  const processedType = type.split(',').join('%2C');

  // eslint-disable-next-line no-undef
  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${processedType}`);
};

// eslint-disable-next-line no-undef
const searchAlbuns = album => fetch(`https://api.spotify.com/v1/search?q=${album}&type=album`);


// eslint-disable-next-line no-undef
const searchArtits = artist => fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`);

// eslint-disable-next-line no-undef
const searchPlaylist = query => fetch(`https://api.spotify.com/v1/search?q=${query || ''}&type=playlist`);

const searchTracks = query => fetch(`https://api.spotify.com/v1/search?q=${query || ''}&type=track`);

export { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks };
