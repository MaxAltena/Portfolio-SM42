const validateHash = (hash, items) => {
  const hashStripped = hash.substr(1);
  var validHash = false;
  if (hash) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].value === hashStripped) {
        if (!items[i].divider) {
          validHash = true;
        }
      }
      if (items[i].children) {
        for (var o = 0; o < items[i].children.length; o++) {
          if (items[i].children[o].value === hashStripped) {
            validHash = true;
          }
          if (items[i].children[o].children) {
            for (var u = 0; u < items[i].children[o].children.length; u++) {
              if (items[i].children[o].children[u].value === hashStripped) {
                validHash = true;
              }
            }
          }
        }
      }
    }
  }
  return validHash;
};

module.exports = validateHash;
