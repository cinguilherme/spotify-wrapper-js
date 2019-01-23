const search = (artist = '', type = '') => {
  const processedType = type.split(',').join('%2C');

  return fetch(`https://api.spotify.com/v1/search?q=${artist}&type=${processedType}`)
    .then(data => data).catch(err => console.log(err));
};

const searchAlbuns = () => {
};

const searchArtits = () => {
};

const searchPlaylist = () => {
};

const searchTracks = () => {
};

export { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks };
