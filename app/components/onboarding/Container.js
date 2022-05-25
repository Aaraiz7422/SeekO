//Import Core Components
import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
//Import Local Components
import OnBoardingItem from './Component';
import Paginator from './Paginator';

// onboarding screens static data
const slides = [
  {
    id: '1',
    title: 'Learn while playing',
    subTitle:
      'Stimulate tactile learning by working together with your child to complete fun activities.',
  },
  {
    id: '2',
    title: 'Broaden your horizons',
    subTitle:
      'Plethora of topics for knowledge on tons of information in the world around us.',
  },
  {
    id: '3',
    title: 'Get your kids’ creative juices flowing',
    subTitle:
      'Research indicates that reading bedtime stories to your children increases their visual processing, imagination and linguistic skills.',
  },
];

const onBoarding = props => {
  const {navigation} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const onClickSkip = () => {
    navigation.navigate('Signup');
  };

  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({item}) => (
          <OnBoardingItem
            item={item}
            onClickSkip={onClickSkip}></OnBoardingItem>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}></FlatList>
      <Paginator data={slides} scrollX={scrollX}></Paginator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default onBoarding;
