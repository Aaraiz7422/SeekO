import axios from 'axios';
import { API_URL } from '../../config';
import { parseUrlData } from '../../helpers';

export default {
  async base_service(url, data, payload) {
    // var headers = {
    //   "Accept": "application/json, text/plain, */*",
    //   "Authorization": "Bearer 032kch2AlEMO0vcnAWTEWhGTJkxzv1",
    // }

    let url_data = parseUrlData(url, data, payload);
    console.log('URL_DATA: ', url_data);
    // console.log(headers);
    try {
      let response = await axios({
        method: url_data.method,
        url: url_data.url,
        data: url_data.data,
        // headers: headers
      });
      
      // console.log('user services response: ', response);
      return await response.data;
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error.response.data);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
      }
      console.log(error);
    }
  },
};
