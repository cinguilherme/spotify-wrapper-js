const wrap = require('../src/main');

const doit = () => {
  const prom = wrap.searchArtits('Muse');
  prom.then((data) => {
    wrap.processChunks(data.body, (objs) => {
      // eslint-disable-next-line no-console
      console.log('objs processed and displayed \n', JSON.parse(objs));
    });
  });
};

doit();
