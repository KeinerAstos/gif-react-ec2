module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.js"],

  // Ignorar CSS, imágenes y otros assets
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js"
  },

  // Evita que Jest intente transformar node_modules pesados
  transformIgnorePatterns: ["/node_modules/"],

  // Opcional: evita que Jest truene si no encuentra coverage
  collectCoverage: false
};
