//Import Core Components
import React, {useState, useContext} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
//Import Plugins and Libraries
import {
  TextInput,
  Button,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//Import Global Components
import CustomButton from '../../global/CustomButton';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
//Import global variables and constants
import global from '../../../../global-styles';
import {input_theme} from '../../../../constants';
import {SCREEN_WIDTH} from '../../../../constants';

const LoginComponent = props => {
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
  const internetAvailability = useContext(NetworkContext);

  const onButtonToggle = value => {
    setShow(!show);
    setVisible(!visible);
  };

  const showLoaderWhileValidatingUser = () => {
    setTimeout(() => setLoading(false), 1000);
    return (
      <ActivityIndicator
        style={loading ? {display: 'flex'} : {display: 'none'}}
        animating={true}
        color="#00CDAC"
      />
    );
  };

  return (
    <>
      {internetAvailability.isConnected ? (
        <KeyboardAwareScrollView
          style={{
            backgroundColor: '#F5F8FF',
          }}
          resetScrollToCoords={{x: 0, y: 0}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F5F8FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={[
                global.row_flex_end_container,
                {
                  width: Dimensions.get('window').width * 1,
                  marginTop: 8,
                  marginRight: 16,
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              ]}>
              <Button
                color="black"
                uppercase={false}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Sign Up
                </Text>
              </Button>
            </View>
            <Image
              source={require('../../../assets/SEEKO_LOGO.png')}
              style={{
                height: Dimensions.get('window').height * 0.15,
                width: Dimensions.get('window').width * 0.5,
                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                margin: 30,
                marginTop: 20,
                color: 'black',
                fontSize: 26,
                fontWeight: '700',
                fontFamily: 'Poppins-Regular',
              }}>
              Sign In
            </Text>
            <View>
              <TextInput
                style={[
                  global.auth_input,
                  {
                    fontSize: 20,
                    height: Dimensions.get('window').height * 0.08,
                    width: SCREEN_WIDTH * 0.8,
                    marginTop: 20,
                    paddingVertical: 0,
                  },
                ]}
                mode="outlined"
                label="Email"
                placeholder="Email"
                activeOutlineColor="rgba(0, 0, 0, 0.57)"
                outlineColor="rgba(0, 0, 0, 0.19)"
                value={email}
                onChangeText={email => {
                  setEmail(email);
                  resetSingleFieldError('email');
                }}
                theme={input_theme}
                left={<TextInput.Icon name="account" style={{marginTop: 12}} />}
              />
              {errors.email && (
                <HelperText type="error" visible={true}>
                  {errors.email}
                </HelperText>
              )}
            </View>
            <View>
              <TextInput
                style={[
                  global.auth_input,
                  {
                    fontSize: 20,
                    height: Dimensions.get('window').height * 0.08,
                    width: SCREEN_WIDTH * 0.8,
                    marginTop: 20,
                    paddingVertical: 0,
                  },
                ]}
                mode="outlined"
                label="Password"
                placeholder="Password"
                activeOutlineColor="rgba(0, 0, 0, 0.57)"
                outlineColor="rgba(0, 0, 0, 0.19)"
                value={password}
                onChangeText={password => {
                  resetSingleFieldError('password');
                  setPassword(password);
                }}
                secureTextEntry={visible}
                theme={input_theme}
                left={<TextInput.Icon name="lock" style={{marginTop: 12}} />}
                right={
                  <TextInput.Icon
                    style={{marginTop: 12}}
                    name={show === true ? 'eye-off' : 'eye'}
                    onPress={onButtonToggle}
                  />
                }
              />
              {errors.password && (
                <HelperText type="error" visible={true}>
                  {errors.password}
                </HelperText>
              )}
            </View>

            <View
              style={[
                global.row_flex_end_container,
                {width: Dimensions.get('window').width * 0.7},
              ]}>
              <Text
                style={[
                  global.anchor_text,
                  {fontFamily: 'Poppins-Regular', color: 'black'},
                ]}
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
                Forgot Password?
              </Text>
            </View>
            {loading ? (
              showLoaderWhileValidatingUser()
            ) : (
              <CustomButton
                backgroundColor={'#DEE8FB'}
                title={'Sign In'}
                height={50}
                width={0.6}
                borderRadius={30}
                textColor={'white'}
                linearStartColor={'#F8C04E'}
                linearEndColor={'#FFBF3C'}
                shadowColor={'#FFBF3C'}
                shadowRadius={20}
                onPress={() => {
                  setLoading(true);
                  let login_information = {
                    username:
                      email !== null ? email.toLowerCase().trim() : email,
                    password: password,
                  };
                  // console.log(` Email : ${email} and Password : ${password}`);
                  validateSignUpInformation(login_information);
                }}></CustomButton>
            )}
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </>
  );
};

export default LoginComponent;
