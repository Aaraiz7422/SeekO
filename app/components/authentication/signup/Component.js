import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
  HelperText,
} from 'react-native-paper';
import global from '../../../../global-styles';
import {input_theme} from '../../../../constants';
import CustomButton from '../../global/CustomButton';
import {SCREEN_WIDTH} from '../../../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignupComponent = props => {
  const loadingIndicator = (
    <ActivityIndicator animating={true} color={Colors.red800} />
  );
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
    <KeyboardAwareScrollView
      style={{
        width: Dimensions.get('window').width * 1,
        backgroundColor: '#F5F8FF',
      }}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      scrollEnabled={false}>
      <View
        style={[
          global.row_flex_end_container,
          {width: Dimensions.get('window').width * 1},
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
      <Image source={require('../../../assets/Logo.png')}></Image>
      <Text
        style={{
          margin: 30,
          color: 'black',
          fontSize: 26,
          fontWeight: '700',
          fontFamily: 'Poppins-Regular',
        }}>
        Sign Up
      </Text>
      <View>
        <TextInput
          style={global.auth_input}
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
        {errors.username && <HelperText type="error" visible={true}>
          {errors.username}
        </HelperText>}
      </View>
      <View>
        <TextInput
          style={global.auth_input}
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
            username: email !== null ? email.toLowerCase().trim():null,
            password: password,
          };
          console.log(
            `Sign Up =====>  Email : ${email} and Password : ${password}`,
          );
          validateSignUpInformation(sign_up_information);
        }}></CustomButton>
      <View
        style={{
          width: SCREEN_WIDTH,
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
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  skip_text: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SignupComponent;
