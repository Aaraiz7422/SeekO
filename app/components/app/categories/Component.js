//Import Core Components
import React, {useContext, useEffect, useState} from 'react';
import {View, Image, Text, FlatList, Dimensions,TouchableOpacity} from 'react-native';
//Import Local Components
import AppHeader from '../AppHeader';
//Import Services and APIs
import services from '../../../api/services';
import {urls} from '../../../api/urls';
//Import Plugins and Libraries
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
//Import Global Components
import CustomCard from '../../global/CustomCard';
import CustomButton from '../../global/CustomButton';
import {fetchTopics} from '../../../../global-functions';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
//Import Redux components and actions
import {
  setChildUserAccount,
  setCurrentUserFetchLoading,
} from '../../../redux/actions/userActions';
import FullScreenModal from '../FullScreenModal';



const CategoryItem = ({navigation, account, categoryName, topicId, index,showModal}) => {
  const [topicListData, setTopicListData] = useState({});
  useEffect(() => {
    // fetchTopics function fetch one topic at time on the base of topicId variable which contains courses list from server 
    // and store topic courses list in topicListData variable using setTopicListData function
    fetchTopics(topicId, setTopicListData);
  }, []);

  const TopicItem = ({item, index}) => {
    return  ( <CustomCard
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
    
    
    // item.unlocked === true ? ( <CustomCard
    //   height={0.38}
    //   width={0.6}
    //   cardTitle={item.name}
    //   coverImage={item.thumbnail}
    //   imageMargin={10}
    //   linearStartColor={index % 2 != 0 ? '#02AAB0' : '#FFAC71'}
    //   linearEndColor={index % 2 != 0 ? '#00CDAC' : '#FF8450'}
    //   shadowColor={index % 2 != 0 ? '#00cbac' : '#FFA06A'}
    //   onLayout={false}
    //   onPress={() => goToTopicDetail(item, index)}></CustomCard> ) : (
    //     <>
    //       <Image
    //         source={require('../../../assets/lock.png')}
    //         style={{
    //           zIndex: 1,
    //           position: 'absolute',
    //           top:Dimensions.get('window').width * 0.1 ,
    //           left: Dimensions.get('window').width * 0.52,
    //           bottom: 0,
    //           right: 0,
    //           height: Dimensions.get('window').height * 0.04,
    //           width: Dimensions.get('window').width * 0.1,
    //           resizeMode: 'contain',
    //           tintColor:'white'
    //           }}></Image>
    //       <CustomCard
    //         height={0.38}
    //         width={0.6}
    //         unlock={false}
    //         cardTitle={item.name}
    //         coverImage={item.thumbnail}
    //         imageMargin={10}
    //         linearStartColor={index % 2 != 0 ? '#02AAB0' : '#FFAC71'}
    //         linearEndColor={index % 2 != 0 ? '#00CDAC' : '#FF8450'}
    //         shadowColor={index % 2 != 0 ? '#00cbac' : '#FFA06A'}
    //         shadowBorder={16}
    //         shawdowOpacity={0.25}
    //         shadowHorizontalMargin={22}
    //         shadowVerticalMargin={20}
    //         onPress={showModal}></CustomCard>
    //     </>
    //   );
  }

  const renderTopicItem = ({item, index}) => (
    <TopicItem item={item} index={index} />
  );

  // this fuction trigger when user click on viewAll button
  const onClickViewAll = () => {
    navigation.navigate('Topics', {
      account: account,
      topicListData: topicListData,
    });
  };

  // diredtly goToTopicDetail from categories screen this function trigger when you click course on categories screen
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

const CategoriesComponent = ({navigation, account, categories,showModal,closeModal,visible}) => {
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
      showModal={showModal}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
      {internetAvailability.isConnected ? (
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
          {loading ? <></>:<FullScreenModal visible={visible} onDismiss={closeModal}>
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
              </FullScreenModal>}
        </View>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
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
