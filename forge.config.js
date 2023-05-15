module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          categories: ['Productivity'],
          authors: 'Ayushmaan Aggarwal',
          description: 'Converts plain text latex to latex code',
        }
      }
    }
  ],
};
