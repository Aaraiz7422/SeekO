import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import global from '../../../global-styles';
import CustomButton from '../global/CustomButton';

function OnBoardingItem({item, onClickSkip}) {
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, {width: width}]}>
      <StatusBar barStyle="dark-content" hidden={true} translucent={true} />
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
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            marginTop: 10,
            marginLeft: 30,
            marginRight: 30,
            textAlign: 'justify',
            color: '#707A8D',
          }}>
          {item.subTitle}
        </Text>
        {/* <View style={{
                    flex: 0.9,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 30,
                }}>

                    <CustomButton
                        backgroundColor={"#DEE8FB"}
                        title={"Sign Up"}
                        height={50}
                        width={0.60}
                        borderRadius={30}
                        textColor={"white"}
                        linearStartColor={'#F8C04E'}
                        linearEndColor={'#FFBF3C'}
                        shadowColor={'#FFBF3C'}
                        shadowRadius={20}
                    ></CustomButton>

                    <CustomButton
                        backgroundColor={"#DEE8FB"}
                        title={"Sign In"}
                        height={50}
                        width={0.60}
                        borderRadius={30}
                        textColor={"white"}
                        linearStartColor={'#F8C04E'}
                        linearEndColor={'#FFBF3C'}
                        shadowColor={'#FFBF3C'}
                        shadowRadius={20}
                    ></CustomButton>

                </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85DADA',
    justifyContent: 'space-between',
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
  },
  bottomContainer: {
    height: '45%',
    // width: '100%',
    borderTopRightRadius: 40,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
  },
});

export default OnBoardingItem;
