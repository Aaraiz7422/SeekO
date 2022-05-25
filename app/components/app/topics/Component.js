//Import Core Components
import React, {useContext} from 'react';
import {View, FlatList, Text, Button} from 'react-native';
//Import Plugins and Libraries
import {ActivityIndicator} from 'react-native-paper';
//Import Global Components
import CustomCard from '../../global/CustomCard';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
//Import Local Components
import AppHeader from '../AppHeader';

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
  } = props;
  const internetAvailability = useContext(NetworkContext);

  const Item = ({item, index}) => (
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
  );

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
