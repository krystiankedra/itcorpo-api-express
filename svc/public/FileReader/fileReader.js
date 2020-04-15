const fs = require('fs')

class FileReader {
  getContent(filepath){
    return fs.readFileSync(filepath)
  }
}

module.exports = {
  FileReader
}
