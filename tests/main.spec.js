import { expect } from 'chai';
import { describe, it } from 'mocha';
import { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks } from '../src/main';

describe('Spotify Wrapper', () => {
  describe('Smoke tests', () => {

    it('should exists the search method', () => {
      expect(search).to.exist;
    });

    it('should exists the search methodAlbuns', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exists the searchArtits method', () => {
      expect(searchArtits).to.exist;
    });

    it('should exists the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist;
    });

    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
  });
});
