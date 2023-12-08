const sharp = require('sharp');

// Helpers to use in handlebars
module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()
    }`;
  },

  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  bufferToImage: function(buffer) {
    const resizedBuffer = sharp(buffer).resize(300).toBuffer();
    const base64Image = resizedBuffer.toString('base64');
    return `data:image/png;base64,${base64Image}`;
  },

  equal: (x, y) => {
    return x === y
  },

  reverse: (arr) => {
    return arr.reverse()
  }
};
