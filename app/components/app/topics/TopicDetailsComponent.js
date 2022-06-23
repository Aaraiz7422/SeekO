//Import Core Components
import React, {useEffect, useContext} from 'react';
import {View, Text, Button} from 'react-native';
//Import Plugins and Libraries
import {ActivityIndicator} from 'react-native-paper';
//Import Global Components
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
//Import global variables and constants
import {SCREEN_WIDTH} from '../../../../constants';
//Import Local Components
import AppHeader from '../AppHeader';
import TopicButtonsContainer from './topic-buttons';
import TopicTabsContainer from './topic-tabs';
import TopicContentContainer from './topic-content';

const TopicDetailsComponent = props => {
  const {
    account,
    fetching_topics,
    fetching_topics_error,
    selected_topic,
    topic_associated_data,
    setTopicDataType,
    selected_topic_title,
    content_type,
    navigation,
    selection_type,
    selected_button,
    // source,
    // setSource,
    // url,
    // setUrl,
    // setFilePath,
    // sharePdf,
    // saveFile,
    // createPdf,
    // requestRunTimePermission,
  } = props;
  const internetAvailability = useContext(NetworkContext);

  useEffect(() => {
    // console.log(`selection type : ${selection_type}`);
    console.log(`Detail selected topic : ${selected_topic}`);
    console.log(`Detail selected button : ${selected_button}`);
    console.log(`Detail selection type : ${selection_type}`);
    console.log(`Detail content type : ${content_type}`);

    // console.log(`Detail selected topic Name : ${selected_topic_title}`);
  }, []);

  // this function shows the UI 
  // on the base of content type ( like category, button, tabs, content etc. )
  const renderTopicContentData = () => {
    switch (content_type) {
      case 'content': {
        console.log(
          'Detail Topic Associated Data Content : ',
          topic_associated_data,
        );
        console.log('Detail Topic Associated Data button : ', selected_button);
        return (
          <TopicContentContainer
            {...props}
            navigation={navigation}
            topic_associated_data={topic_associated_data}
            selected_topic_title={selected_topic_title}
            parent_data={
              selection_type === 'by_topic' ? selected_topic : selected_button
            }
          />
        );
      }
      case 'buttons': {
        console.log('Detail Topic Associated Data : ', topic_associated_data);
        return (
          <TopicButtonsContainer
            {...props}
            navigation={navigation}
            selected_topic={selected_topic}
            topic_associated_data={topic_associated_data.buttons}
          />
        );
      }
      case 'tabs': {
        let routes = [];
        for (let tab of topic_associated_data.tabs) {
          tab = {...tab, key: tab.id, title: tab.name, type: 'content'};
          routes.push(tab);
        }
        // console.log('Routes: ', routes);
        return (
          <TopicTabsContainer
            {...props}
            routes={routes}
            parent_data={
              selection_type === 'by_topic' ? selected_topic : selected_button
            }
          />
        );
      }
      default: {
        return;
      }
    }
  };
  // console.log("TDDDDDDDDDDDDDDDDDD");
  return (
    <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
      {internetAvailability.isConnected ? (
        <>
          <View style={{paddingTop: 10, backgroundColor: '#F5F8FF'}}>
            <AppHeader
              {...props}
              image={account.avatar[0].avatar}
              title={
                selected_topic
                  ? selected_topic.name
                  : selected_topic_title
                  ? selected_topic_title
                  : 'Good Topic'
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: '#F5F8FF',
              width: SCREEN_WIDTH,
              paddingTop: 10,
            }}>
            {!fetching_topics &&
            !fetching_topics_error &&
            topic_associated_data ? (
              renderTopicContentData()
            ) : fetching_topics ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#00CDAC" />
              </View>
            ) : (
              fetching_topics_error && (
                <View>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    Tap to reload
                  </Text>
                  <Button
                    title="click me"
                    onPress={() => setTopicDataType()}></Button>
                </View>
              )
            )}
          </View>
        </>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </View>
  );
};

export default TopicDetailsComponent;
