const utils = require('./request');
const baseUrl = 'http://42.192.157.252:8888/'; 
 
module.exports = {
 
  // GET
  getInfo: function (url,data, config = {}) {
    let urls = baseUrl + url
    return utils.getRequest(
      urls,
      data,
      utils.getCommonHeader(),
      config
    );
  },
 
   // put 
 
  putInfo: function (url,data, config = {}) {
    return utils.putRequest(
      baseUrl + url,
      data,
      utils.getCommonHeader(),
      config
    );
  },

  postInfo: function (url,data, config = {}) {
    return utils.postRequest(
      baseUrl + url,
      data,
      utils.getCommonHeader(),
      config
    );
  },
}