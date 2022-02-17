import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import global from '../../../../global-styles';
import { input_theme } from '../../../../constants';
import CustomButton from '../../global/CustomButton';

const LoginComponent = (props) => {
    const loadingIndicator = <ActivityIndicator animating={true} color={Colors.red800} />;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const {
        navigation,
        validateSignUpInformation,
        setLoading,
        loading,
        resetSingleFieldError,
        errors,
    } = props;


    const onButtonToggle = value => {
        setShow(!show);
        setVisible(!visible);
    };


    return (
        <View style={[global.auth_container, {
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <View style={[global.row_flex_end_container, { width: Dimensions.get('window').width * 1 }]}>
                <Button
                    color='black'
                    uppercase={false}
                    onPress={() => {
                        navigation.navigate('Signup');
                    }
                    }>
                    <Text style={{ fontSize: 16,fontFamily:'Poppins-Regular', }}>Sign Up</Text>
                </Button>
            </View>
            <Image
                source={require('../../../assets/Logo.png')}
            ></Image>
            <Text style={{ margin: 30, fontSize: 26, fontWeight: '700',fontFamily:'Poppins-Regular', }}>Sign In</Text>
            <View>
                <TextInput
                    style={global.auth_input}
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    activeOutlineColor='rgba(0, 0, 0, 0.57)'
                    outlineColor='rgba(0, 0, 0, 0.19)'
                    value={email}
                    onChangeText={(email) => {
                        setEmail(email);
                        resetSingleFieldError('email');
                    }}
                    theme={input_theme}
                    left={<TextInput.Icon name="account" style={{ marginTop: 12 }} />}
                />
                <HelperText type='error' visible={true} style={{}}>{errors.email}</HelperText>
            </View>
            <View>

                <TextInput
                    style={global.auth_input}
                    mode="outlined"
                    label="Password"
                    placeholder="Password"
                    activeOutlineColor='rgba(0, 0, 0, 0.57)'
                    outlineColor='rgba(0, 0, 0, 0.19)'
                    value={password}
                    onChangeText={(password) => {
                        resetSingleFieldError('password');
                        setPassword(password);
                    }}
                    secureTextEntry={visible}
                    theme={input_theme}
                    left={<TextInput.Icon name="lock" style={{ marginTop: 12 }} />}
                    right={
                        <TextInput.Icon style={{ marginTop: 12 }}
                            name={show === true ? "eye-off" : "eye"}
                            onPress={onButtonToggle}
                        />
                    }
                />
                <HelperText type='error' visible={true}>{errors.password}</HelperText>
            </View>

            <View style={[global.row_flex_end_container, { width: Dimensions.get('window').width * 0.7 }]}>
                <Text
                    style={[global.anchor_text,{fontFamily:'Poppins-Regular',}]}
                    onPress={() => { navigation.navigate('ForgotPassword');}
                    }>
                    Forgot Password?
                </Text>
            </View>
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
                onPress={() => {
                    setLoading(true);
                    loading ? loadingIndicator : loading;
                    let login_information = {
                        username: email.toLowerCase(),
                        password: password,
                    };
                    console.log(` Email : ${email} and Password : ${password}`);
                    validateSignUpInformation(login_information);
                }}
            ></CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    skip_text: {
        fontSize: 10,
        fontWeight: '400',
    }
});

export default LoginComponent;
