//Import Core Components
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
//Import Plugins and Libraries
import {TouchableOpacity} from 'react-native-gesture-handler';
//Import global variables and constants
import global from '../../../global-styles';

function OnBoardingItem({item, onClickSkip}) {
  const {width} = useWindowDimensions();

  return (
    <>
      <View style={[styles.container, {width: width}]}>
        <View style={[global.row_flex_end_container, {width: width * 0.9}]}>
          <TouchableOpacity onPress={onClickSkip}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
                fontWeight: '700',
              }}>
              {item.id === '3' ? 'Done' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomContainer, {width: width}]}>
          <Text
            style={{
              fontSize: 40,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
              marginLeft: 30,
              marginRight: 30,
              padding: 20,
              textAlign: 'center',
              color: '#707A8D',
            }}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
            allowFontScaling={true}>
            {item.title}
          </Text>
          <View
            style={{
              height: Dimensions.get('window').height * 0.26,
            }}>
            <Text
              style={{
                fontSize: 200,
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                marginLeft: 30,
                marginRight: 30,
                textAlign: 'justify',
                color: '#707A8D',
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={5}>
              {item.subTitle}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#85DADA',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    height: Dimensions.get('window').height * 0.5,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
  },
});

export default OnBoardingItem;
