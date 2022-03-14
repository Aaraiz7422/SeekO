import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions, Text, Image} from 'react-native';
import {
  Avatar,
  Badge,
  TextInput,
  ActivityIndicator,
  Colors,
  HelperText,
} from 'react-native-paper';
import global from '../../../../global-styles';
import {input_theme, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants';
import CustomButton from '../../global/CustomButton';
import AppHeader from '../AppHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import DropDownListComponent from '../DropDownList';
import services from '../../../api/services';
import {urls} from '../../../api/urls';
import FullScreenModal from '../FullScreenModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const UserComponent = props => {
  const loadingIndicator = (
    <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#00CDAC" />
          </View>
  );

  const {
    account,
    navigation,
    child_account_info,
    edit_user_profile,
    showModal,
    closeModal,
    addUser,
    deleteChildAccount,
    name,
    setName,
    dob,
    setDOB,
    gender,
    setGender,
    date,
    setDate,
    open,
    setOpen,
    value,
    setValue,
    isFocus,
    setIsFocus,
    visible,
    setVisible,
    avatarList,
    setAvatarList,
    profileImage,
    setProfileImage,
    errors,
    setErrors,
    loading,
    setLoading,
    validateChildInformation,
  } = props;

  const AvatarCard = () => {
    console.log('ALlllllllllllllllllllllllllll', avatarList);
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {avatarList.map((element, index) => {
          console.log('image : ', element.avatar);
          return (
            <View
              style={{height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.26}}>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setProfileImage(element);
                  closeModal();
                }}>
                {/* <Text>{element.id}</Text> */}
                <Image
                  source={{uri: element.avatar}}
                  style={{
                    height: SCREEN_HEIGHT * 0.18,
                    width: SCREEN_WIDTH * 0.26,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: '#F5F8FF',
      }}
      resetScrollToCoords={{x: 0, y: 0}}
      stickyHeaderIndices={[0]}
      scrollEnabled={true}>
      <AppHeader
        title={edit_user_profile ? 'Edit User' : 'Create User'}
        image={edit_user_profile && account.avatar[0].avatar}>
        {' '}
      </AppHeader>
      <FullScreenModal visible={visible} closeModal={closeModal}>
        <ScrollView>
          <AvatarCard></AvatarCard>
          {/* <AvatarCard></AvatarCard>
          <AvatarCard></AvatarCard> */}
          {/* <AvatarCard></AvatarCard> */}
        </ScrollView>
      </FullScreenModal>
      <View
        style={{
          position: 'relative',
          zIndex: -10,
          height: Dimensions.get('window').height * 0.9,
        }}>
        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity 
            onPress={() => {
              showModal();
            }}>
            <View style={{margin: 5 }}>
              <Avatar.Image
                size={130}
                style={{
                  backgroundColor:'#F5F8FF'}}
                source={
                  profileImage === null
                    ? edit_user_profile
                      ? {uri: account.avatar[0].avatar}
                      : require('../../../assets/user.png')
                    : {uri: profileImage.avatar}
                }
              />
              <Avatar.Icon
                size={24}
                icon="plus"
                style={{
                  top: -30,
                  left: 100,
                  backgroundColor: '#C4C4C4',
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: Dimensions.get('window').height * 0.4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <TextInput
                style={{
                  fontSize: 20,
                  height: 60,
                  width: SCREEN_WIDTH * 0.8,
                  marginTop: 20,
                }}
                mode="outlined"
                label="Name"
                placeholder="Name"
                activeOutlineColor="rgba(0, 0, 0, 0.57)"
                outlineColor="rgba(0, 0, 0, 0.19)"
                value={name}
                theme={input_theme}
                onChangeText={email => setName(email)}
                left={<TextInput.Icon name="account" style={{marginTop: 12}} />}
              />
              {errors.name !== null && (
                <HelperText type="error" visible={true} style={{}}>
                  {errors.name}
                </HelperText>
              )}
              <TextInput
                onFocus={props => setOpen(true)}
                style={{
                  fontSize: 20,
                  height: 60,
                  width: SCREEN_WIDTH * 0.8,
                  marginTop: 20,
                }}
                mode="outlined"
                label="DOB"
                placeholder="dd-mm-yyyy"
                activeOutlineColor="rgba(0, 0, 0, 0.57)"
                outlineColor="rgba(0, 0, 0, 0.19)"
                value={dob}
                onChangeText={dob => {
                  setDOB(dob);
                }}
                theme={input_theme}
                left={
                  <TextInput.Icon name="calendar" style={{marginTop: 12}} />
                }
              />
              <DropDownListComponent
                value={value}
                isFocus={isFocus}
                setValue={setValue}
                setIsFocus={setIsFocus}></DropDownListComponent>
            </View>
            <View style={{margin: 20}}>
              {edit_user_profile ? (
                <>
                  <CustomButton
                    backgroundColor={'#DEE8FB'}
                    title={'Make Changes'}
                    height={60}
                    width={0.64}
                    borderRadius={30}
                    textColor={'white'}
                    linearStartColor={'#F8C04E'}
                    linearEndColor={'#FFBF3C'}
                    shadowColor={'#FFBF3C'}
                    shadowRadius={20}
                    onPress={
                      name === null
                        ? () => {}
                        : () => {
                            setLoading(true);
                            loading ? loadingIndicator : loading;
                            let child_information = {
                              name: name,
                              user_id: account.id,
                            };
                            console.log(
                              `Edited child Name .............................. : ${name}`,
                            );
                            validateChildInformation(child_information);
                          }
                    }></CustomButton>
                  <CustomButton
                    backgroundColor={'#FFFFFF'}
                    title={'Delete User'}
                    height={60}
                    width={0.64}
                    borderColor={'red'}
                    borderWidth={1}
                    borderRadius={30}
                    onPress={() =>
                      deleteChildAccount(child_account_info.id)
                    }></CustomButton>
                </>
              ) : (
                <CustomButton
                  backgroundColor={'#DEE8FB'}
                  title={'Create User'}
                  height={50}
                  width={0.6}
                  borderRadius={30}
                  textColor={'white'}
                  linearStartColor={'#F8C04E'}
                  linearEndColor={'#FFBF3C'}
                  shadowColor={'#FFBF3C'}
                  shadowRadius={20}
                  onPress={
                    name === null
                      ? () => {}
                      : () => {
                          setLoading(true);
                          loading ? loadingIndicator : loading;
                          let child_information = {
                            name: name,
                          };
                          console.log(
                            `child Name .............................. : ${name}`,
                          );
                          validateChildInformation(child_information);
                        }
                  }></CustomButton>
              )}
            </View>
          </View>
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            let month = date.getUTCMonth() + 1; //months from 1-12
            let day = date.getUTCDate();
            let year = date.getUTCFullYear();
            let newdate = day + '-' + month + '-' + year;
            setDOB(newdate.toString());
            console.log('New Selected Date', newdate);
            console.log('Selected Date', date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {/* <View
          style={{
            height: Dimensions.get('window').height * 1,
            // top: -(Dimensions.get('window').height * 0.7),
            zIndex:18,
            position:'relative'
          }}> */}
        {/* <FullScreenModal visible={visible} closeModal={closeModal}>
            <ScrollView>
              <AvatarCard></AvatarCard>
              <AvatarCard></AvatarCard>
              <AvatarCard></AvatarCard>
            </ScrollView>
          </FullScreenModal> */}
        {/* </View> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UserComponent;
