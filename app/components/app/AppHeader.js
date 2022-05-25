//Import Core Components
import React from 'react';
import {Text, Dimensions, View, Image} from 'react-native';
//Import Plugins and Libraries
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({title, image, onGoBack = null}) => {
  // useNavigation is a hook which gives access to navigation object.
  // It's useful when you cannot pass the navigation prop into the component directly,
  // or don't want to pass it in case of a deeply nested child.
  const navigation = useNavigation();

  // triggers when user click on back button
  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header
      style={{
        backgroundColor: '#F5F8FF',
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        elevation: 0,
        marginTop: 0,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 0,
      }}>
      <Appbar.BackAction
        style={{margin: 0, padding: 0, width: 30, alignItems: 'flex-start'}}
        onPress={onGoBack === null ? _goBack : onGoBack}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          //   backgroundColor:'purple',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: 'green',
            width: Dimensions.get('window').width * 0.8,
          }}>
          <Text
            style={{
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
              //   paddingBottom:12
            }}
            adjustsFontSizeToFit={true}
            numberOfLines={3}
            allowFontScaling={true}>
            {title}
          </Text>
        </View>
        {image ? (
          <Image
            source={{uri: image}}
            style={{
              height: 30,
              width: 30,
              borderRadius: 16,
              marginTop: 4,
              marginRight: 16,
            }}></Image>
        ) : (
          <Appbar.Action icon="account" />
        )}
      </View>
    </Appbar.Header>
  );
};

export default AppHeader;
