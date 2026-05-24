const { MakerZIP } = require('@electron-forge/maker-zip');

module.exports = {
  packagerConfig: {
    asar: true,
    name: '拾光集',
    appBundleId: 'com.shiguangji.blog',
    osxSign: undefined,
  },
  makers: [
    new MakerZIP({}, ['darwin', 'linux']),
  ],
};
