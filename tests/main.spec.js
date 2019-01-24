/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
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
  let fetchStub;
  // eslint-disable-next-line no-unused-vars
  let promise;
  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });
  afterEach(() => {
    fetchStub.restore();
  });

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
    it('should make a fetch request to the spotify api', () => {
      search();
      expect(fetchStub).to.have.been.calledOnce;
    });

    context('passing only one type', () => {
      it('should call a fetch with the url for artist Incubus', () => {
        search('Incubus', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist&limit=5&offset=2');
      });

      it('should call a fetch with the url for artist Muse', () => {
        search('Muse', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist&limit=5&offset=2');
      });

      it('should call a fetch with the url for albuns from Muse', () => {
        search('Muse', 'album');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album&limit=5&offset=2');
      });
    });

    context('passing multiple types', () => {
      it('should call a fetch with url for artist and album with Muse as the query', () => {
        search('Muse', 'album,artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album%2Cartist&limit=5&offset=2');
      });
    });

    context('deal with the promise', () => {
      it('should get a json from the resolved promise', (done) => {
        promise = fetchStub.resolves({ body: 'json' });
        search('Incubus', 'artist').then((data) => {
          expect(data).to.be.eql({ body: 'json' });
          done();
        });
      });
    });
  });

  describe('Album search', () => {
    it('should call fetch', () => {
      searchAlbuns();
      expect(fetchStub).to.be.calledOnce;
    });

    it('should call fetch with an url', () => {
      searchAlbuns('Muse');
      expect(fetchStub).to.be.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album&limit=5&offset=2');
    });

    context('albumSearch with promisse handled', () => {
      it('should return a json from promise', async () => {
        promise = fetchStub.resolves({ body: 'json', album: 'lola' });
        const album = await searchAlbuns('Muse');
        expect(album).to.be.eql({ body: 'json', album: 'lola' });
      });
    });
  });

  describe('Artist Search', () => {
    it('should call a fetch', () => {
      searchArtits();
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should call fetch with url', () => {
      searchArtits('Muse');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist&limit=5&offset=2');
    });
    it('should resolve a promise with data', async () => {
      promise = fetchStub.resolves({ body: 'json', artist: 'Muse' });
      const artist = await searchArtits('Muse');
      expect(artist).to.be.eql({ body: 'json', artist: 'Muse' });
    });
  });

  describe('Playlist Search', () => {
    it('should call a fetch', () => {
      searchPlaylist();
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should call with url', () => {
      searchPlaylist();
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=&type=playlist&limit=5&offset=2');
    });
    it('should call with url correctly', () => {
      searchPlaylist('Muse');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist&limit=5&offset=2');
    });
    it('should call with correct url diferent query', () => {
      searchPlaylist('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist&limit=5&offset=2');
    });
  });

  describe('Search tracks', () => {
    it('should call fetch', () => {
      searchTracks();
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should call fetch with url', () => {
      searchTracks();
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=&type=track&limit=5&offset=2');
    });
    it('should call fetch with correct url for muse tracks', () => {
      searchTracks('Muse');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track&limit=5&offset=2');
    });
    it('should call fetch with correct url for incubus tracks', () => {
      searchTracks('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track&limit=5&offset=2');
    });
  });
});

