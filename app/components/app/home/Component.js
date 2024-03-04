//Import Core Components
import React, {useRef, useContext, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
//Import Plugins and Libraries
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
//Import Global Components
import ConnectionModal from '../../global/ConnectionModal';
import {NetworkContext} from '../../../../network-context';
// Menu
import menu from '../../../assets/menu.png';
import close from '../../../assets/close.png';

const HomeComponent = props => {
  const {selectedTab} = props;
  const [currentTab, setCurrentTab] = useState('Home'); // default selected screen is home and default selected tab is also home.
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false); // flag for toggle menu
  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const {
    current_user_fetching,
    current_user_error,
    current_user,
    getCurrentUserAction,
    navigation,
    onLogout,
  } = props;
  const internetAvailability = useContext(NetworkContext);

  // triggers when user click on menu or close icon on home screen
  const openCloseMenu = () => {
    // Do Actions Here....
    // Scaling the view...
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: showMenu ? 0 : Dimensions.get('window').width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !showMenu ? 0 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F8FF'}}>
      {internetAvailability.isConnected ? (
        <View style={{flex: 1}}>
          <LinearGradient
            colors={['#85DADA', '#2CB8B8']}
            style={[styles.container, {width: Dimensions.get('window').width}]}>
            <View style={{justifyContent: 'flex-start', padding: 15}}>
              <View style={{flexGrow: 1}}>
                {
                  // Tab Bar Buttons....
                }
                {TabButton(
                  onLogout,
                  openCloseMenu,
                  currentTab,
                  setCurrentTab,
                  'Home',
                  'home',
                )}
                {TabButton(
                  onLogout,
                  openCloseMenu,
                  currentTab,
                  setCurrentTab,
                  'Track Progress',
                  'tachometer-alt',
                )}
                {TabButton(
                  onLogout,
                  openCloseMenu,
                  currentTab,
                  setCurrentTab,
                  'Users',
                  'user',
                )}
                {TabButton(
                  onLogout,
                  openCloseMenu,
                  currentTab,
                  setCurrentTab,
                  'Subscription',
                  'payments',
                )}
              </View>

              <View style={{marginBottom: 10}}>
                {TabButton(
                  onLogout,
                  openCloseMenu,
                  currentTab,
                  setCurrentTab,
                  'LogOut',
                  'logout',
                )}
              </View>
            </View>
          </LinearGradient>
          {
            // Over lay View...
          }
          <Animated.View
            style={{
              flexGrow: 1,
              backgroundColor: '#F5F8FF',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 15,
              // paddingVertical: 20,
              borderRadius: showMenu ? 30 : 0,
              // Transforming View...
              transform: [{scale: scaleValue}, {translateX: offsetValue}],
            }}>
            {
              // Menu Button...
            }

            <Animated.View
              style={{
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
              }}>
              <TouchableOpacity
                onPress={() => {
                  openCloseMenu();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Image
                    source={showMenu ? close : menu}
                    style={{
                      width: 24,
                      height: 20,
                      tintColor: 'black',
                    }}></Image>
                  <Text
                    style={{
                      lineHeight: 25,
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Regular',
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    {currentTab}
                  </Text>
                </View>
              </TouchableOpacity>
              {selectedTab(currentTab, props)}
            </Animated.View>
          </Animated.View>
        </View>
      ) : (
        <ConnectionModal
          visible={!internetAvailability.isConnected}></ConnectionModal>
      )}
    </View>
  );
};

// For multiple tab Buttons...
const TabButton = (
  onLogout,
  openCloseMenu,
  currentTab,
  setCurrentTab,
  title,
  image,
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == 'LogOut') {
          onLogout();
          openCloseMenu();
          // Do your Stuff...
        } else {
          setCurrentTab(title);
          openCloseMenu();
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          // backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}>
        {image === 'home' || image === 'payments' || image === 'logout' ? (
          <Icon2
            name={image}
            size={image === 'home' ? 34 : 28}
            color={'white'}
            style={{
              paddingRight: image === 'payments' ? 4 : 0,
              marginLeft: image === 'home' ? -5 : 0,
            }}></Icon2>
        ) : (
          <Icon
            name={image}
            solid
            size={image === 'user' ? 28 : 22}
            color={'white'}
            style={{paddingRight: image === 'user' ? 8 : 6}}></Icon>
        )}

        <Text
          style={{
            fontSize: currentTab == title ? 22 : 18,
            fontWeight: currentTab == title ? 'bold' : 'normal',
            fontFamily: 'Poppins-Regular',
            paddingLeft: 15,
            marginTop: title === 'Track Progress' ? 4 : 0,
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default HomeComponent;
