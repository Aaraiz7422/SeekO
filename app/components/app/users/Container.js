import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import { Avatar, Badge, TextInput, } from 'react-native-paper';
import global from '../../../../global-styles';
import { input_theme, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants';
import CustomButton from '../../global/CustomButton';
import AppHeader from '../AppHeader';
import { TouchableOpacity, } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'
import DropDownListComponent from '../DropDownList';
import services from '../../../api/services';
import { urls } from '../../../api/urls';
import FullScreenModal from '../FullScreenModal';
import UserComponent from './Component';
import {connect} from 'react-redux';
import {
    getCurrentUser,
    setChildUserAccount,
    setCurrentUserFetchLoading,
  } from '../../../redux/actions/userActions';

const UserContainer = (props) => {

    // User Creation Fields States
    const [name, setName] = useState(null);
    const [dob, setDOB] = useState(null);
    const [gender, setGender] = useState(null);
    // DateTimePicker States
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    // DropDown States
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    // Modal States
    const [visible, setVisible] = useState(false);

    const [avatarList, setAvatarList] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

    const { child_account_info, edit_user_profile } = props.route.params;
    const {navigation} = props;

    // Child Name Error Handling and State
    const [errors, setErrors] = useState(
        {
            name: null,
        }
    );
    const [loading, setLoading] = useState(false);


    const resetErrors = () => {
        let error = errors;
        error.name = null;
        setErrors(error);
    };

    useEffect(() => {
        fetchAvatarList();
    }, [])

    const fetchAvatarList = () => {
        services
            .base_service(urls.get_avatar_list)
            .then((response) => {
                console.log("Avatar List ............ ", response);
                setAvatarList(response);
            })
            .catch((error) => {
                console.log('Fetching error: ', error);
            });
    }

    const showModal = () => setVisible(true);
    const closeModal = () => setVisible(false);

    const validateChildInformation = (child_information) => {
        resetErrors();
        let error = errors;
        let is_error = false;
        if (child_information.name.length < 3) {
            error.name = 'Please Enter child name greater than 3 letters';
            is_error = true;
        }
        if (is_error) {
            setErrors(error);
            setLoading(false);
            return;
        } else {
            addUser(child_information);
        } 
    }
    const addUser = (child_information) => {
        let gen;
        if (gender === "Male")
            gen = "M"
        if (gender === "Female")
            gen = "F"
        if (gender === "Others")
            gen = "O"

        let payload = {
            "password": 12,
            "username": child_information.name,
            "name": child_information.name,
            "gender": gen,
            "dob": dob,
            "avatar": profileImage.id,
        }

        services
            .base_service(urls.user_register, payload)
            .then((response) => {
                console.log('Create User response: ', response);
            })
            .catch((error) => {
                console.log('fetch categories error: ', error);
            });

        navigation.pop();
    }

    const deleteChildAccount = user_id => {
    const {getCurrentUserAction, setCurrentUserFetchLoadingAction} = props;

    setCurrentUserFetchLoadingAction(true);
        let data = { user_id: user_id };
        services
            .base_service(urls.delete_user_by_id, data)
            .then(response => {
                getCurrentUserAction();
        setCurrentUserFetchLoadingAction(false);
                console.log('response: ', response);
            })
            .catch(error => {
                console.log('delete account error: ', error);
        setCurrentUserFetchLoadingAction(false);

            });
        navigation.pop();
    };

    return (
        <UserComponent
            {...props}
            name={name} setName={setName}
            dob={dob} setDOB={setDOB}
            gender={gender} setGender={setGender}
            date={date} setDate={setDate}
            open={open} setOpen={setOpen}
            value={value} setValue={setValue}
            isFocus={isFocus} setIsFocus={setIsFocus}
            visible={visible} setVisible={setVisible}
            avatarList={avatarList} setAvatarList={setAvatarList}
            profileImage={profileImage} setProfileImage={setProfileImage}
            showModal={showModal}
            closeModal={closeModal}
            addUser={addUser}
            deleteChildAccount={deleteChildAccount}
            child_account_info={child_account_info}
            edit_user_profile={edit_user_profile}
            errors = {errors} setErrors={setErrors}
            loading={loading} setLoading={setLoading}
            validateChildInformation={validateChildInformation}
        ></UserComponent>
    );
}


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
    // Redux Store --> Component
    return {
      logged_in: state.authReducer.logged_in,
      auth_token: state.authReducer.auth_token,
      current_user_fetching: state.userReducer.current_user_fetching,
      current_user: state.userReducer.current_user,
      current_user_error: state.userReducer.current_user_error,
    };
  };
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = dispatch => {
    // Action
    return {
      setCurrentUserFetchLoadingAction: loading =>
        dispatch(setCurrentUserFetchLoading(loading)),
      getCurrentUserAction: setUserId =>
        dispatch(getCurrentUser(userId => setUserId(userId))),
      logoutAction: () => dispatch(logout()),
      setChildUserAccountAction: child_account =>
        dispatch(setChildUserAccount(child_account)),
    };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);