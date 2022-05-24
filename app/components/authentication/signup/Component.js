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
//Import global variables and constants
import global from '../../../../global-styles';
import {input_theme} from '../../../../constants';
import {SCREEN_WIDTH} from '../../../../constants';
//Import Global Components
import CustomButton from '../../global/CustomButton';
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';

const SignupComponent = props => {
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
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Sign In
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
              Sign Up
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
                theme={input_theme}
                left={<TextInput.Icon name="account" style={{marginTop: 12}} />}
                onChangeText={email => {
                  resetSingleFieldError('username');
                  setEmail(email);
                }}
              />
              {errors.username && (
                <HelperText type="error" visible={true}>
                  {errors.username}
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
                secureTextEntry={visible}
                onChangeText={password => {
                  resetSingleFieldError('password');
                  setPassword(password);
                }}
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
              <HelperText type="error" visible={true}>
                {errors.password}
              </HelperText>
            </View>
            {loading ? (
              showLoaderWhileValidatingUser()
            ) : (
              <CustomButton
                backgroundColor={'#DEE8FB'}
                title={'Sign Up'}
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
                  // loading ? loadingIndicator : loading;
                  let sign_up_information = {
                    username:
                      email !== null ? email.toLowerCase().trim() : null,
                    password: password,
                  };
                  console.log(
                    `Sign Up =====>  Email : ${email} and Password : ${password}`,
                  );
                  validateSignUpInformation(sign_up_information);
                }}></CustomButton>
            )}
            <View
              style={{
                // width: SCREEN_WIDTH,
                alignItems: 'center',
                marginTop: 16,
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: 'black'}}>
                Already have an account?&nbsp;
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                  }}
                  onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </>
  );
};

export default SignupComponent;
