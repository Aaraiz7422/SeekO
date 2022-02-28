export const URL_PARAMETERS = 'URL_PARAMETERS';
export const PAYLOAD = 'PAYLOAD';
export const GET_PARAMETERS = 'GET_PARAMETERS';
export const URL_PARAMETERS_AND_PAYLOAD = 'URL_PARAMETERS_AND_PAYLOAD';

export const urls = {
  user_login: {
    url: '/oauth2/token/',
    method: 'POST',
    type: PAYLOAD,
  },
  request_reset_password: {
    url: '/user/password/reset/',
    method: 'POST',
    type: PAYLOAD,
  },
  update_password: {
    url: '/user/password/update/',
    method: 'POST',
    type: PAYLOAD,
  },
  convert_token: {
    url: '/oauth2/convert-token/',
    method: 'POST',
    type: PAYLOAD,
  },
  user_register: {
    url: '/user/register/new/',
    method: 'POST',
    type: PAYLOAD,
  },
  get_avatar_list: {
    url: '/user/avatar/list/',
    method: 'GET',
    type: PAYLOAD,
  },
  get_current_user: {
    url: '/user/current/view/',
    method: 'GET',
    type: PAYLOAD,
  },
  get_user_by_id: {
    url: '/user/user_id/',
    parameters: ['user_id'],
    method: 'GET',
    type: URL_PARAMETERS,
  },
  edit_user_by_id: {
    url: '/user/user_id/',
    parameters: ['user_id'],
    method: 'PATCH',
    type: URL_PARAMETERS_AND_PAYLOAD,
  },
  delete_user_by_id: {
    url: '/user/user_id/',
    method: 'DELETE',
    parameters: ['user_id'],
    type: URL_PARAMETERS,
  },
  get_categories_list: {
    url: '/content/category/list/',
    method: 'GET',
    type: PAYLOAD,
  },
  get_topics_by_category: {
    url: '/content/category/category_id/',
    method: 'GET',
    parameters: ['category_id'],
    type: URL_PARAMETERS,
  },
  get_topics_by_topic: {
    url: '/content/topic/topic_id/',
    method: 'GET',
    parameters: ['topic_id'],
    type: URL_PARAMETERS,
  },
  get_tabs_list_by_topic: {
    url: '/content/topic/topic_id/tab/list/',
    method: 'GET',
    parameters: ['topic_id'],
    type: URL_PARAMETERS,
  },
  get_buttons_list_by_topic: {
    url: '/content/topic/topic_id/button/list/',
    method: 'GET',
    parameters: ['topic_id'],
    type: URL_PARAMETERS,
  },
  get_content_by_topic: {
    url: '/content/topic/topic_id/content/',
    method: 'GET',
    parameters: ['topic_id'],
    type: URL_PARAMETERS,
  },
  get_content_by_button: {
    url: '/content/button/button_id/content/',
    method: 'GET',
    parameters: ['button_id'],
    type: URL_PARAMETERS,
  },
  get_content_by_tab: {
    url: '/content/tab/tab_id/content/',
    method: 'GET',
    parameters: ['tab_id'],
    type: URL_PARAMETERS,
  },
  get_tabs_by_button: {
    url: '/content/button/button_id/tabs/',
    method: 'GET',
    parameters: ['button_id'],
    type: URL_PARAMETERS,
  },
  get_quiz_by_id: {
    url: '/quiz/quiz_id/view/',
    method: 'GET',
    parameters: ['quiz_id'],
    type: URL_PARAMETERS,
  },
  attempt_quiz: {
    url: '/quiz/quiz_id/attempt/',
    method: 'POST',
    parameters: ['quiz_id'],
    type: URL_PARAMETERS_AND_PAYLOAD,
  },
  track_progress: {
    url: '/user/user_id/progress/',
    method: 'GET',
    parameters: ['user_id'],
    type: URL_PARAMETERS,
  },
};
