import React from 'react';
import { Text, StyleSheet, Dimensions, View,Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_WIDTH } from '../../../constants';



const AppHeader = ({ title, image, onGoBack=null}) => {
    const navigation = useNavigation();
    
    // useNavigation is a hook which gives access to navigation object. 
    // It's useful when you cannot pass the navigation prop into the component directly, 
    // or don't want to pass it in case of a deeply nested child.

    const _goBack = () => {
        navigation.goBack();
    }

    return (
        <Appbar.Header style={{ backgroundColor: '#F5F8FF', justifyContent: "flex-start", elevation: 0, height: 30,marginBottom:10,marginTop:10,paddingLeft:10,paddingRight:0 }}>
            <Appbar.BackAction
            style={{margin:0,padding:0,width:30,alignItems:"flex-start"}}
            onPress={onGoBack === null ? _goBack:onGoBack} 
            />
            <View style={{ height: Dimensions.get('window').height * 0.12,justifyContent:'flex-start',alignItems:'center',flexDirection: "row",  width: Dimensions.get('window').width * 0.78 }}>
                <Text style={{ fontSize: 22,color:'black', fontWeight:'bold',fontFamily:'Poppins-Regular' }} numberOfLines={3}>{title}</Text>
            </View>
            {
                image ? <Image source={{uri:image}} style={{height:30,width:30,borderRadius:16,marginTop:4}}></Image> : <Appbar.Action icon="account"/>
            }
        </Appbar.Header>
    );
}

export default AppHeader;