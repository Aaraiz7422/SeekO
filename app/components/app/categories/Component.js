import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import AppHeader from '../AppHeader';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CustomCard from '../../global/CustomCard';
import services from '../../../api/services';
import {urls} from '../../../api/urls';
import CustomButton from '../../global/CustomButton';
import {fetchTopics} from '../../../../global-functions';
import {ActivityIndicator} from 'react-native-paper';
import {
  setChildUserAccount,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';
// import {useNetInfo} from '@react-native-community/netinfo';
import ConnectionModal from '../../global/ConnectionModal';
import { NetworkContext } from '../../../../network-context';

const CategoryItem = ({navigation, account, categoryName, topicId, index}) => {
  const [topicListData, setTopicListData] = useState({});
  useEffect(() => {
    fetchTopics(topicId, setTopicListData);
  }, []);

  const TopicItem = ({item, index}) => (
    <CustomCard
      height={0.38}
      width={0.6}
      cardTitle={item.name}
      coverImage={item.thumbnail}
      imageMargin={10}
      linearStartColor={index % 2 != 0 ? '#02AAB0' : '#FFAC71'}
      linearEndColor={index % 2 != 0 ? '#00CDAC' : '#FF8450'}
      shadowColor={index % 2 != 0 ? '#00cbac' : '#FFA06A'}
      onLayout={false}
      onPress={() => goToTopicDetail(item, index)}></CustomCard>
  );

  const renderTopicItem = ({item, index}) => (
    <TopicItem item={item} index={index} />
  );

  const onClickViewAll = () => {
    navigation.navigate('Topics', {
      account: account,
      topicListData: topicListData,
    });
  };

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
    <>
      <View
        style={{
          marginLeft: 20,
          marginBottom: -20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            fontFamily: 'Poppins-Regular',
          }}>
          {categoryName}
        </Text>
        <TouchableOpacity
          onPress={onClickViewAll}
          style={{
            marginVertical: 16,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              color: 'black',
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={topicListData.topics}
        renderItem={renderTopicItem}
        horizontal={true}></FlatList>
    </>
  );
};

const CategoriesComponent = ({navigation, account, categories}) => {
  const [loading, setLoading] = useState(true);
  // const netInfo = useNetInfo();
  const internetAvailability = useContext(NetworkContext);
  // console.log(`isConnected : ${internetAvailability.isConnected}`);

  const loadingFullScreenAtOnce = () => {
    const item = (
      <View>
        <ActivityIndicator
          color="#00CDAC"
          style={loading ? {display: 'flex'} : {display: 'none'}}
          size={'large'}></ActivityIndicator>
        <View style={loading ? {display: 'none'} : {display: 'flex'}}>
          <FlatList
            bounces={false}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <AppHeader
                image={account.avatar[0].avatar}
                title={'Hi, ' + account.name}></AppHeader>
            }
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
    setTimeout(() => setLoading(false), 2500);

    return item;
  };

  const renderCategoryItem = ({item, index}) => (
    <CategoryItem
      navigation={navigation}
      account={account}
      categoryName={item.name}
      index={index}
      topicId={item.id}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
      { internetAvailability.isConnected ? (
        <View
          style={
            loading
              ? {
                  flex: 1,
                  backgroundColor: '#F5F8FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {flex: 1, backgroundColor: '#F5F8FF'}
          }>
          {loading ? loadingFullScreenAtOnce() : loadingFullScreenAtOnce()}
        </View>
      ) : (
        <ConnectionModal visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </View>

    // <View
    //   style={
    //     loading
    //       ? {
    //           flex: 1,
    //           backgroundColor: '#F5F8FF',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }
    //       : {flex: 1, backgroundColor: '#F5F8FF'}
    //   }>
    //   {loading ? loadingFullScreenAtOnce() : loadingFullScreenAtOnce()}
    // </View>
  );
};

export default CategoriesComponent;
