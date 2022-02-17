import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TextInput, ToggleButton } from 'react-native-paper';
import global from '../../../../global-styles';
import { input_theme } from '../../../../constants';
import CustomButton from '../../global/CustomButton';


const ForgetPassword = () => {

    const [name, setName] = useState(null);


    return (
        <View style={[global.auth_container, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{
                flex: 1.5,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Image
                    // style={styles.tinyLogo}
                    source={require('../../../assets/Logo.png')}
                ></Image>
                <Text style={{ margin: 30, fontSize: 26, fontWeight: '700',fontFamily:'Poppins-Regular', }}>Forget Password</Text>

                <TextInput
                    style={global.auth_input}
                    mode="outlined"
                    label="Username"
                    placeholder="Username"
                    activeOutlineColor='rgba(0, 0, 0, 0.57)'
                    outlineColor='rgba(0, 0, 0, 0.19)'
                    value={name}
                    secureTextEntry
                    theme={input_theme}
                    left={<TextInput.Icon name="lock" style={{ marginTop: 12 }} />}
                />
            </View>
            <View style={{ flex: 1,justifyContent: 'flex-start', alignItems: 'center',marginTop:50 }}>

                <CustomButton
                    backgroundColor={"#DEE8FB"}
                    title={"Send Link"}
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


export default ForgetPassword;
