//Import Core Components
import React from 'react';
import {View, Text} from 'react-native';
//Import Local Components
import FullScreenModal from '../../components/app/FullScreenModal';

const ConnectionModal = props => {
  return (
    <FullScreenModal visible={props.visible}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Connection Error
        </Text>

        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
      </View>
    </FullScreenModal>
  );
};

export default ConnectionModal;
