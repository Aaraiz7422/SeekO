import {
  URL_PARAMETERS,
  PAYLOAD,
  GET_PARAMETERS,
  URL_PARAMETERS_AND_PAYLOAD,
} from './app/api/urls';
import { API_URL } from './config';

export function parseUrlData(api_data, data, payload) {
  let url_data = {
    ...api_data,
    data: null,
  };
  switch (api_data.type) {
    case URL_PARAMETERS:
      let url = api_data.url;
      for (let parameter of api_data.parameters) {
        url = url.replace(parameter, data[parameter]);
      }
      url_data = {
        ...api_data,
        url: API_URL + url,
        data: null,
      };
      console.log('url_after_replaced: ', url);
      return url_data;
    case URL_PARAMETERS_AND_PAYLOAD: {
      let url = api_data.url;
      for (let parameter of api_data.parameters) {
        url = url.replace(parameter, data[parameter]);
      }
      url_data = {
        ...api_data,
        url: API_URL + url,
        data: payload,
      };
      console.log('url_after_replaced: ', url);
      return url_data;
    }
    case PAYLOAD:
      url_data = {
        ...api_data,
        url: API_URL + api_data.url,
        data: data,
      };
      return url_data;
    case GET_PARAMETERS:
      break;
    default:
      return;
  }
}

export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let is_valid_email = reg.test(email);
  return is_valid_email;
}
