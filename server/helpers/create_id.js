let id = 3;
module.exports = function* createId() {
  while (id) {
    yield id += 1;
  }
};
