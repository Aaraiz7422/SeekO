import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TextInput, ToggleButton } from 'react-native-paper';
import global from '../../../../global-styles';
import { input_theme } from '../../../../constants';
import CustomButton from '../../global/CustomButton';

const ResetPassword = () => {

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmedPassword] = useState(null);


    return (
        <View style={global.auth_container}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    // style={styles.tinyLogo}
                    source={require('../../../assets/Logo.png')}
                ></Image>
                <Text style={{ margin: 30,color:'black', fontSize: 26, fontWeight: '700',fontFamily:'Poppins-Regular', }}>Reset Password</Text>

                <TextInput
                    style={global.auth_input}
                    activeOutlineColor='rgba(0, 0, 0, 0.57)'
                    outlineColor='rgba(0, 0, 0, 0.19)'
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    theme={input_theme}
                    left={<TextInput.Icon name="lock" style={{ marginTop: 12 }} />}
                />
                <TextInput
                    style={global.auth_input}
                    mode="outlined"
                    activeOutlineColor='rgba(0, 0, 0, 0.57)'
                    outlineColor='rgba(0, 0, 0, 0.19)'
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={password}
                    secureTextEntry
                    theme={input_theme}
                    left={<TextInput.Icon name="lock" style={{ marginTop: 12 }} />}
                />
            </View>
            <View style={{ flex: 0.4, justifyContent: 'space-between', alignItems: 'center'}}>

                <CustomButton
                    backgroundColor={"#DEE8FB"}
                    title={"Reset Password"}
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
    );
};


export default ResetPassword;
