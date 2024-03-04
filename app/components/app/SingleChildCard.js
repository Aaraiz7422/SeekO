
//Import Core Components
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
//Import Plugins and Libraries
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Card,
  Title,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
//Import global variables and constants
import {
  MAX_CHILD_ACCOUNTS,
} from '../../../constants';

const CardComponent = ({
  trackProgress,
  setChildUserAccountAction,
  navigation,
  account,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (trackProgress === false) {
          setChildUserAccountAction(account);
          navigation.navigate('Categories', {account: account});
        }
        if (trackProgress === true) {
          navigation.navigate('TrackProgress', {
            account: account,
            selected_child_account: account,
            selected_screen: 'quizzes_list',
          });
        }
        if (trackProgress === undefined) {
          navigation.navigate('CreateUser', {
            account: account,
            child_account_info: account,
            edit_user_profile: true,
          });
        }
      }}>
      <Card
        key={account.id}
        style={{
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').height * 0.27,
          margin: 5,
          borderRadius: 3,
          alignItems: 'center',
          elevation: 0,
          backgroundColor: 'transparent',
          // backgroundColor:"green",
        }}>
        <Card.Content></Card.Content>
        <Card.Cover
          source={
            // {uri:`${account.avatar[0].avatar}`}
            account.avatar.length < 1
              ? require('../../assets/childAvatar.png')
              : {uri: `${account.avatar[0].avatar}`}
          }
          style={{
            opacity: 1,
            backgroundColor: 'transparent',
            height: 116,
            width: 116,
            borderRadius: 58,
            margin: 10,
          }}
        />
        <Title
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
          }}>
          {account.name}
        </Title>
      </Card>
    </TouchableOpacity>
  );
};

const SingleChildCard = props => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const {
    current_user,
    trackProgress,
    showAddChildAccountModal,
    navigation,
    setChildUserAccountAction,
    current_user_fetching,
    current_user_error,
    getCurrentUserAction,
    registerNewChild,
  } = props;

  let passAccountToUserComponent;

  const child_accounts = current_user.child_accounts;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 40,
      }}>
      {!current_user_fetching && !current_user_error && current_user ? (
        <>
          {child_accounts.length > 0 ? (
            <>
              {child_accounts.map((account, index) => {
                passAccountToUserComponent = account;
                return (
                  <CardComponent
                    key={index}
                    trackProgress={trackProgress}
                    setChildUserAccountAction={setChildUserAccountAction}
                    account={account}
                    index={index}
                    navigation={navigation}></CardComponent>
                );
              })}
              {trackProgress === false ? (
                child_accounts &&
                child_accounts.length < MAX_CHILD_ACCOUNTS && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').width * 0.4,
                      height: Dimensions.get('window').height * 0.27,
                      // backgroundColor:'purple',
                      marginTop: 4,
                    }}>
                    <Icon.Button
                      name="pluscircle"
                      size={110}
                      iconStyle={{marginRight: 0}}
                      padding={0}
                      borderRadius={110}
                      backgroundColor={'#DFDDDD'}
                      onPress={() => {
                        navigation.navigate('CreateUser', {
                          child_account_info: passAccountToUserComponent,
                          edit_user_profile: false,
                        });
                      }}></Icon.Button>
                  </View>
                )
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {trackProgress === false && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get('window').width * 0.4,
                    height: Dimensions.get('window').height * 0.27,
                    // backgroundColor:'purple',
                    marginTop: 4,
                  }}>
                  <Icon.Button
                    name="pluscircle"
                    size={110}
                    iconStyle={{marginRight: 0}}
                    padding={0}
                    borderRadius={110}
                    backgroundColor={'#DFDDDD'}
                    onPress={() => {
                      navigation.navigate('CreateUser', {
                        child_account_info: passAccountToUserComponent,
                        edit_user_profile: false,
                      });
                    }}></Icon.Button>
                </View>
              )}
              {trackProgress === false ? (
                <Text
                  style={{fontFamily: 'Poppins-Regular', textAlign: 'center'}}>
                  There is no child account yet. Tap + to create a child
                </Text>
              ) : (
                <Text
                  style={{fontFamily: 'Poppins-Regular', textAlign: 'center'}}>
                  There is no child account yet. Visit the home screen to create
                  a child
                </Text>
              )}
            </>
          )}
        </>
      ) : current_user_fetching ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00CDAC" />
        </View>
      ) : (
        current_user_error && (
          <>
            <Button
              title="Tap to reload"
              onPress={() => getCurrentUserAction()}></Button>
          </>
        )
      )}
    </View>
  );
};

export default SingleChildCard;
