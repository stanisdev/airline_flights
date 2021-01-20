const { dirname, join } = require('path');
const srcDir = dirname(__dirname);
const storageDir = join(srcDir, 'storage');

export default {
  dirs: {
    root: srcDir,
    components: join(srcDir, 'components'),
    storage: storageDir,
  },
  files: {
    countries: join(storageDir, 'countries.txt'),
  }
};
