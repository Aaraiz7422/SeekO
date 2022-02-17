import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { Card, Title, TextInput, Button, ActivityIndicator, Colors, HelperText } from 'react-native-paper';
import { COLORS, SCREEN_WIDTH,MAX_CHILD_ACCOUNTS, input_theme } from '../../../constants';
import global from '../../../global-styles';
import services from '../../api/services';
import { urls } from '../../api/urls';
import FullScreenModal from './FullScreenModal';
import CustomButton from '../global/CustomButton';



const CardComponent = ({ trackProgress, setChildUserAccountAction, navigation, account, index }) => (
    <TouchableOpacity onPress={() => {
        if (trackProgress === false) {
            setChildUserAccountAction(account);
            navigation.navigate('Categories', { accountName: account.name });
        }
        if (trackProgress === true) {
            navigation.navigate('TrackProgress', { 
                selected_child_account: account,
                selected_screen: 'quizzes_list',
                // selected_child_account: {}, selected_screen: null 
            })
        }
        if (trackProgress === undefined) {
            navigation.navigate('CreateUser',{child_account_info:account,edit_user_profile:true});
        }
    }}>

        <Card
            key={account.id}
            style={
                {
                    width: Dimensions.get('window').width * 0.4,
                    height: Dimensions.get('window').height * 0.27,
                    margin: 5,
                    // backgroundColor: COLORS.secondary_background_color,
                    borderRadius: 3,
                    alignItems: 'center',
                    // opacity:0.9,
                    elevation: 0,
                    backgroundColor: 'transparent'
                }
            }>
            <Card.Content>
            </Card.Content>
            <Card.Cover
                source={require('../../assets/childAvatar.png')}
                style={{
                    opacity: 1,
                    backgroundColor: 'transparent',
                    height: 116, width: 116,
                    margin: 10,
                    // borderRadius: 100 
                }} />
            <Title style={{ textAlign: 'center' }}>{account.name}</Title>
        </Card>
    </TouchableOpacity>
);

// export default MyComponent;

const SingleChildCard = (props) => {

    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const {
        current_user,
        trackProgress,
        showAddChildAccountModal,
        navigation,
        setChildUserAccountAction
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
            }}
        >
            {
                child_accounts.length > 0 ?
                    <>
                        {child_accounts.map((account, index) => 
                        {
                            passAccountToUserComponent = account;
                            console.log(passAccountToUserComponent);
                         return <CardComponent key={index} trackProgress={trackProgress} setChildUserAccountAction={setChildUserAccountAction} account={account} index={index} navigation={navigation} ></CardComponent>
                        }
                        )}
                        {trackProgress === false ? child_accounts && child_accounts.length < MAX_CHILD_ACCOUNTS && (<View
                            style={{
                                justifyContent: 'center', alignItems: 'center',
                                width: Dimensions.get('window').width * 0.4,
                                height: Dimensions.get('window').height * 0.27,
                                // backgroundColor:"purple",
                            }}
                        >

                            <Icon.Button
                                name='pluscircle'
                                size={110}
                                iconStyle={{ marginRight: 0 }}
                                padding={0}
                                borderRadius={110}
                                backgroundColor={"#DFDDDD"}
                                onPress={() => {
                                    navigation.navigate('CreateUser',{child_account_info:passAccountToUserComponent,edit_user_profile:false});
                                }}>
                            </Icon.Button>
        </View>
        )
                         : <></>}

                    </>
                    :
                    (
                        <>
                            <View
                                style={{
                                    justifyContent: 'center', alignItems: 'center',
                                    width: Dimensions.get('window').width * 0.4,
                                    height: Dimensions.get('window').height * 0.27,
                                    // backgroundColor:"purple",
                                }}
                            >

                                <Icon.Button
                                    name='pluscircle'
                                    size={110}
                                    iconStyle={{ marginRight: 0 }}
                                    padding={0}
                                    borderRadius={110}
                                    backgroundColor={"#DFDDDD"}
                                    onPress={() => {
                                        navigation.navigate('CreateUser',{child_account_info:passAccountToUserComponent,edit_user_profile:false});
                                    }}>
                                </Icon.Button>
                            </View>
                            <Text>There is no child account yet. Tap plus button to register your child account.</Text>
                        </>
                    )
            }
            {/* <FullScreenModal visible={showAddChildAccountModal} closeModal={showAddChildAccountModal(true)}>
                <View>
                    <Text>
                        Add new child.
                    </Text>
                    <View>
                        <TextInput
                            style={global.auth_input}
                            mode="outlined"
                            label="Email"
                            placeholder="Email"
                            activeOutlineColor='rgba(0, 0, 0, 0.57)'
                            outlineColor='rgba(0, 0, 0, 0.19)'
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                            theme={input_theme}
                            left={<TextInput.Icon name="account" style={{ marginTop: 12 }} />}
                        />
                        <HelperText type='error' visible={true} >Enter a valid email</HelperText>
                    </View>
                    <View>
                        <TextInput
                            style={global.auth_input}
                            mode="outlined"
                            label="Name"
                            placeholder="Name"
                            activeOutlineColor='rgba(0, 0, 0, 0.57)'
                            outlineColor='rgba(0, 0, 0, 0.19)'
                            value={name}
                            onChangeText={(name) => setName(name)}
                            theme={input_theme}
                            left={<TextInput.Icon name="account" style={{ marginTop: 12 }} />}
                        />
                    </View>
                </View>
            </FullScreenModal> */}
        </View>
    );
}

const styles = StyleSheet.create({
    modal_container: {
        width: SCREEN_WIDTH * 0.9,
        padding: 32,
        borderRadius: 16,
    },
    card_image: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner_card_container: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.13,
        backgroundColor: COLORS.secondary_background_color,
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        borderRadius: 3,
    },
    add_more_card_container: {
        flexDirection: 'column',
        width: 100,
        height: 100,
        backgroundColor: COLORS.secondary_background_color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginTop: 50,
    },
    card: {
        width: 100,
        marginHorizontal: 32,
        marginVertical: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginTop: 15,
        ...global.regular_bold_family,
    },
    icon: {
        width: 24,
        height: 24,
    },
    button: {
        marginTop: 8,
        paddingHorizontal: 30,
    },
});

export default SingleChildCard;