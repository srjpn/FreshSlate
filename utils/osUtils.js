const os = require("os");

function detectOS() {
  return os.platform(); // macOS will return 'darwin'
}

module.exports = { detectOS };
