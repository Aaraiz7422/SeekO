//Import Core Components
import React, {useContext, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
//Import Plugins and Libraries
import {ActivityIndicator} from 'react-native-paper';
//Import Global Components
import CustomCard from '../../global/CustomCard';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
//Import Local Components
import AppHeader from '../AppHeader';
import FullScreenModal from '../FullScreenModal';
import CustomButton from '../../global/CustomButton';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const TopicsListComponent = props => {
  const {
    account,
    navigation,
    fetching_topics,
    fetching_topics_error,
    selection_type,
    selected_category,
    selected_topic,
    topicListData,
    fetchTopics,
    showModal,
    closeModal,
    visible,
  } = props;

  const internetAvailability = useContext(NetworkContext);

  const Item = ({item, index}) => {
    console.log(`Lock on item #${index + 1} : ${item.unlocked}`);
    return item.unlocked === true ? (
      <CustomCard
        height={0.38}
        width={0.9}
        cardTitle={item.name}
        coverImage={item.thumbnail}
        imageMargin={10}
        linearStartColor={index % 2 != 0 ? '#02AAB0' : '#FFAC71'}
        linearEndColor={index % 2 != 0 ? '#00CDAC' : '#FF8450'}
        shadowColor={index % 2 != 0 ? '#00cbac' : '#FFA06A'}
        shadowBorder={16}
        shawdowOpacity={0.25}
        shadowHorizontalMargin={22}
        shadowVerticalMargin={20}
        onPress={() => goToTopicDetail(item, index)}></CustomCard>
    ) : (
      <>
        <Image
          source={require('../../../assets/lock.png')}
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 40,
            left: Dimensions.get('window').width * 0.8,
            bottom: 0,
            right: 0,
            height: Dimensions.get('window').height * 0.04,
            width: Dimensions.get('window').width * 0.1,
            resizeMode: 'contain',
          }}></Image>
        <CustomCard
          height={0.38}
          width={0.9}
          unlock={false}
          cardTitle={item.name}
          coverImage={item.thumbnail}
          imageMargin={10}
          linearStartColor={index % 2 != 0 ? '#02AAB0' : '#FFAC71'}
          linearEndColor={index % 2 != 0 ? '#00CDAC' : '#FF8450'}
          shadowColor={index % 2 != 0 ? '#00cbac' : '#FFA06A'}
          shadowBorder={16}
          shawdowOpacity={0.25}
          shadowHorizontalMargin={22}
          shadowVerticalMargin={20}
          onPress={showModal}></CustomCard>
      </>
    );
  };

  const renderItem = ({item, index}) => <Item item={item} index={index} />;
  // diredtly goToTopicDetail from topic course list screen this function trigger when you click course from topic list screen
  const goToTopicDetail = (item, index) => {
    navigation.push('Topics', {
      account: account,
      selected_topic: item,
      index: index,
    });
    console.log(
      `Go to Detail Component : ${item.name} ${item.thumbnail} ${item} ${index}`,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
      {internetAvailability.isConnected ? (
        <>
          {!fetching_topics && !fetching_topics_error && topicListData ? (
            <View
              style={[
                {flex: 1, backgroundColor: '#F5F8FF', alignItems: 'center'},
              ]}>
              <FlatList
                bounces={false}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={
                  <AppHeader
                    title={topicListData.name}
                    image={account.avatar[0].avatar}></AppHeader>
                }
                data={topicListData.topics}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
              <FullScreenModal visible={visible} onDismiss={closeModal}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                      paddingTop: 10,
                    }}>
                    One course in each
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    category is unlocked every
                  </Text>

                  <Text
                    style={{
                      color: '#02AAB0',
                      fontWeight: 'bold',
                      fontSize: 36,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    12 Hours
                  </Text>

                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    Next course will be unlocked in
                  </Text>

                  <Text
                    style={{
                      color: '#02AAB0',
                      fontWeight: 'bold',
                      fontSize: 24,
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                    }}>
                    43:37:15
                  </Text>

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -8,
                      left: Dimensions.get('window').width * 0.69,
                      bottom: 0,
                      right: 0,
                    }}
                    onPress={closeModal}>
                    <Image
                      source={require('../../../assets/close-modal.png')}
                      style={{
                        height: Dimensions.get('window').height * 0.03,
                        width: Dimensions.get('window').width * 0.2,
                        resizeMode: 'contain',
                      }}></Image>
                  </TouchableOpacity>
                </View>
              </FullScreenModal>
            </View>
          ) : fetching_topics ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#00CDAC" />
            </View>
          ) : (
            fetching_topics_error && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: '#F5F8FF',
                  marginTop: 10,
                }}>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  Tap to reload
                </Text>
                <Button title="click me" onPress={() => fetchTopics()}></Button>
              </View>
            )
          )}
        </>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </View>
  );
};

export default TopicsListComponent;
