import services from './app/api/services';
import { urls } from './app/api/urls';

export const fetchCategories = (setCategories) => {
    services
        .base_service(urls.get_categories_list)
        .then((response) => {
            console.log(response);
            setCategories(response)
        })
        .catch((error) => {
            console.log('Fetching error: ', error);
        });
}

export const fetchTopics = (topicId,setTopicListData) => {
    services
        .base_service(urls.get_topics_by_category, { category_id: topicId })
        .then((response) => {
            console.log(response);
            setTopicListData(response)
        })
        .catch((error) => {
            console.log('Fetching error: ', error);
        });
}


export const fetchTopic = (topicId,setTopic) => {
    services
        .base_service(urls.get_topics_by_topic, { topic_id: topicId })
        .then((response) => {
            setTopic(response)
        })
        .catch((error) => {
            console.log('Fetching Topic error: ', error);
        });
}

export const fetchContent = (topicId, setContent) => {
    services
        .base_service(urls.get_content_by_topic, { topic_id: topicId })
        .then((response) => {
            setContent(response.content);
        })
        .catch((error) => {
            console.log('Fetching Content error: ', error);
        });
}

export const fetchTabs = (buttonId,setTabs) => {
    services
        .base_service(urls.get_tabs_by_button, { button_id: buttonId })
        .then((response) => {
            console.log(response.tabs);
            setTabs(response.tabs);
        })
        .catch((error) => {
            console.log('Fetching Tabs error: ', error);
        });
}

export const fetchButtons = (topicId,setButtons) => {
    services
        .base_service(urls.get_buttons_list_by_topic, { topic_id: topicId})
        .then((response) => {
            setButtons(response.buttons);
            console.log(`Fetch Buttons:      ${response.buttons}`);
        })
        .catch((error) => {
            console.log('Fetching Buttons error: ', error);
        });
}