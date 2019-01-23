import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbuns, searchArtits, searchPlaylist, searchTracks } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');


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

  describe('Generic search', () => {
    let fetchStub;
    let promise;

    beforeEach(() => {
      fetchStub = sinon.stub(global, 'fetch');
      promise = fetchStub.resolves({ body: 'json' });
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('should make a fetch request to the spotify api', () => {
      search();
      expect(fetchStub).to.have.been.calledOnce;
    });

    context('passing only one type', () => {
      it('should call a fetch with the url for artist Incubus', () => {
        search('Incubus', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
      });

      it('should call a fetch with the url for artist Muse', () => {
        search('Muse', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
      });

      it('should call a fetch with the url for albuns from Muse', () => {
        search('Muse', 'album');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
      });
    });

    context('passing multiple types', () => {
      it('should call a fetch with url for artist and album with Muse as the query', () => {
        search('Muse', 'album,artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album%2Cartist');
      });
    });

    context('deal with the promise', () => {
      it('should get a json from the resolved promise', () => {
        const artist = search('Incubus', 'artist');
        console.log('1', artist);
        expect(artist).to.be.eql({ body: 'json' });
      });
    });
  });
});
