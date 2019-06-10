let id = 3;
module.exports = function* createId() {
  while (true) {
    yield id += 1;
  }
};
