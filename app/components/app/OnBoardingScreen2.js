import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions, Alert } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import global from '../../../global-styles';
import CustomButton from '../global/CustomButton';

function OnBoardingScreen2() {
    return (
        <SafeAreaView style={styles.container}>
            {/* <View> */}
                <StatusBar
                    barStyle="dark-content"
                    hidden={true}
                    translucent={true}
                />
            {/* </View> */}
            <View style={ [global.row_flex_end_container, { width: Dimensions.get('window').width * 0.8,}]}>
                <Text
                    style={{color:'black',fontSize:16,fontWeight:'400'}}
                    // status={'primary'}
                    onPress={() => { }
                        // }
                        // this.props.navigation.navigate('ForgotPassword')
                    }>
                    Skip
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                {/* <Text style={{ fontSize: 40, marginLeft: 30, marginRight: 30, fontWeight: '700', padding: 20, textAlign: 'center' }}>Learn While Playing</Text> */}
                <Text style={{ fontSize: 16, marginTop: 50, marginLeft: 30, marginRight: 30, textAlign: 'justify', color: '#707A8D' }}>The average company forecasts a growth   178% in revenues for their first year, 100% for </Text>
                <View style={{
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

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#85DADA',
        justifyContent: 'space-between',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    bottomContainer: {
        height: '45%',
        width: '100%',
        borderTopRightRadius: 40,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
    },
});

export default OnBoardingScreen2;