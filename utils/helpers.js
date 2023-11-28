// Helpers to use in handlebars
module.exports = {
  format_date: (date) => {
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  },

  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
};
