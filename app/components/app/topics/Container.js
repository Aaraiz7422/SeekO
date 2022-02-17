import React, { useEffect, useState } from 'react';
import TopicsListComponent from './Component';

//Import Redux components and actions
import { connect } from 'react-redux';
import { getCurrentUser, setSelectedTopic, setCurrentUserFetchLoading } from '../../../redux/actions/userActions';
import TopicDetailsComponent from './TopicDetailsComponent';
//Import Services and APIs
import services from '../../../api/services';
import { urls } from '../../../api/urls';

const TopicsContainer = (props) => {
  const { navigation, route } = props;
  const { topicListData } = route.params;

  const [selection_type, setSelectionType] = useState("by_category");
  const [selected_topic_title, setSelectedTopicTitle] = useState(null);
  const [selected_category, setSelectedCategory] = useState(topicListData);
  const [selected_topic, set_Selected_Topic] = useState(null);
  const [selected_button, setSelectedButton] = useState(null);
  const [content_type, setContentType] = useState(null);

  const [fetching_topics, setFetchingTopics] = useState(false);
  const [fetching_topics_error, setFetchingTopicsError] = useState(false);

  const [topic_associated_data, setTopicAssociatedData] = useState(null);
  const [topic_list_data, set_Topic_List_Data] = useState(topicListData);


  useEffect(() => {
    if (props.route.params.topicListData !== undefined) {
      setSelectedCategory(topicListData);
      if (selected_category !== null) {
        fetchTopics();
      }
    }
    if (props.route.params.selected_topic !== undefined) {
      let s_topic = props.route.params.selected_topic;
      props.setSelectedTopicAction(s_topic);
      setSelectionType("by_topic");
      set_Selected_Topic(s_topic);
      setSelectedTopicTitle(s_topic.name);
    }

    if (props.route.params.selected_button !== undefined) {
      let s_button = props.route.params.selected_button;
      let c_type = props.route.params.content_type;
      let s_topic_title = props.route.params.selected_topic_title
      setSelectionType("by_button");
      setContentType(c_type);
      setSelectedButton(s_button);
      setSelectedTopicTitle(s_topic_title);
    }


    console.log(`selection type : ${selection_type}`);
    console.log(`content type : ${content_type}`);
    console.log(`selected topic : ${selected_topic}`);
    console.log(`selected button : ${selected_button}`);
    console.log(`selected topic Name : ${selected_topic_title}`);

  }, []);

  useEffect(() => {
    console.log("Effect Updated");
    console.log(`Selection type : ${selection_type}`);

    if (selected_topic !== null) {
      if (selected_topic.is_leaf) {
        setTopicDataType();
      } else {
        fetchTopics();
      }
      console.log(`selected topic id: ${selected_topic.id}`);
    }
    if (selected_button !== null) {
      fetchContentByButton();
    }
    console.log(`selected topic Name : ${selected_topic_title}`);
  }, [selection_type, selected_topic_title]);

  const setLoadingAndErrorState = (fetching_topics, fetching_topics_error) => {
    setFetchingTopics(fetching_topics);
    setFetchingTopicsError(fetching_topics_error);
  };

  const fetchTopics = () => {
    setLoadingAndErrorState(true);
    let data = null;
    let url = null;
    if (selection_type === 'by_category') {
      data = { category_id: selected_category.id };
      url = urls.get_topics_by_category;
    } else {
      data = { topic_id: selected_topic.id };
      url = urls.get_topics_by_topic;
    }
    services
      .base_service(url, data)
      .then((response) => {
        console.log('topics response: ', response);
        if (selection_type === 'by_category') {
          setSelectedCategory(response);
        } else {
          set_Selected_Topic(response);
          setSelectedTopicTitle(response.name);
          console.log("11111111111111LLLLLLLLLLLLLLLLLLLLLLLoooooooooooooggggggggg", response);

        }
        console.log("LLLLLLLLLLLLLLLLLLLLLLLoooooooooooooggggggggg", response);
        set_Topic_List_Data(response)
        setLoadingAndErrorState(false, false);
      })
      .catch((error) => {
        setLoadingAndErrorState(false, true);
        console.log('fetch topics error: ', error);
      });
  };

  const fetchContentByButton = () => {
    setLoadingAndErrorState(true);
    // const {selected_button, content_type} = this.state;
    let data = { button_id: selected_button.id };
    let url =
      content_type === 'tabs'
        ? urls.get_tabs_by_button
        : urls.get_content_by_button;
    fetchTopicData(url, data);
  };

  const fetchTopicData = (url, data) => {
    services
      .base_service(url, data)
      .then((response) => {
        console.log('fetchTopicData response: ', response);
        setTopicAssociatedData(response);
        setLoadingAndErrorState(false, false);
      })
      .catch((error) => {
        setLoadingAndErrorState(false, true);
        console.log('fetchTopicData  error: ', error);
      });
  };

  const setTopicDataType = () => {
    setLoadingAndErrorState(true);
    // const {selected_topic, selection_type} = state;
    console.log(`selected topic id: ${selected_topic.id}`);
    let data = { topic_id: selected_topic.id };
    let url = null;
    if (selected_topic && selection_type === 'by_topic') {
      let content_type =
        !selected_topic.has_buttons && !selected_topic.has_tabs
          ? 'content'
          : selected_topic.has_buttons
            ? 'buttons'
            : selected_topic.has_tabs
              ? 'tabs'
              : null;
      console.log('Content Type: ', content_type);
      setContentType(content_type);
      switch (content_type) {
        case 'content': {
          url = urls.get_content_by_topic;
          fetchTopicData(url, data);
          return;
        }
        case 'buttons': {
          url = urls.get_buttons_list_by_topic;
          fetchTopicData(url, data);
          return;
        }
        case 'tabs': {
          url = urls.get_tabs_list_by_topic;
          fetchTopicData(url, data);
          return;
        }
        default: {
          setLoadingAndErrorState(false, true);
          return;
        }
      }
    }

    // console.log("Topic Associated Data : ",topic_associated_data);
  };

  return (selected_topic &&
    selected_topic.is_leaf &&
    selection_type === 'by_topic') ||
    selection_type === 'by_button' ? (
    <TopicDetailsComponent
      fetching_topics={fetching_topics}
      fetching_topics_error={fetching_topics_error}
      selected_topic={selected_topic}
      selected_topic_title={selected_topic_title}
      selection_type={selection_type}
      setTopicDataType={setTopicDataType}
      selected_button={selected_button}
      content_type={content_type}
      navigation={navigation}
      topic_associated_data={topic_associated_data}
    />
  ) : (
    <TopicsListComponent {...props} navigation={navigation}
      fetchTopics={fetchTopics}
      fetching_topics={fetching_topics}
      fetching_topics_error={fetching_topics_error}
      selection_type={selection_type}
      selected_category={selected_category}
      selected_topic={selected_topic}
      topicListData={topic_list_data}
    ></TopicsListComponent>
  );
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    logged_in: state.authReducer.logged_in,
    auth_token: state.authReducer.auth_token,
    current_user_fetching: state.userReducer.current_user_fetching,
    current_user: state.userReducer.current_user,
    current_user_error: state.userReducer.current_user_error,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setCurrentUserFetchLoadingAction: (loading) =>
      dispatch(setCurrentUserFetchLoading(loading)),
    getCurrentUserAction: () => dispatch(getCurrentUser()),
    setSelectedTopicAction: (selected_topic) => dispatch(setSelectedTopic(selected_topic)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TopicsContainer);