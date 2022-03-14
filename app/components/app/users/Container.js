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
    
    const {account, child_account_info, edit_user_profile } = props.route.params;

    const showGenderInEdit = (gender) => {
        let gen;
            if (gender === "M")
                 return gen = "Male";
            if (gender === "F")
                return gen = "Female";
            if (gender === "O")
                return gen = "Others";
        }

    const showDateInEdit = (date) => {
        let day,month,year;
        let returnDate = null;
        if(date !== null){

            let containDate = date.split('-');
            year = containDate[0];
            month = containDate[1];
            day = containDate[2];
    
            returnDate = day + "-" + month + "-" + year;
        }
        return returnDate;
    }


    // User Creation Fields States
    const [name, setName] = useState(edit_user_profile ? account.name:null);
    const [dob, setDOB] = useState( edit_user_profile ? showDateInEdit(account.dob) :null);
    const [gender, setGender] = useState(edit_user_profile ? showGenderInEdit(account.gender):null);
    // DateTimePicker States
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    // DropDown States
    const [value, setValue] = useState(edit_user_profile ? showGenderInEdit(account.gender) :null);
    const [isFocus, setIsFocus] = useState(false);
    // Modal States
    const [visible, setVisible] = useState(false);

    const [avatarList, setAvatarList] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

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
        props.getCurrentUserAction();
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
            props.setCurrentUserFetchLoadingAction(true);
            addUser(child_information);
        } 
    }
    const addUser = (child_information) => {
        const {current_user, getCurrentUserAction} = props;

        let gen;
        let dateStyleOnServer;
        if (gender === "Male")
            gen = "M"
        if (gender === "Female")
            gen = "F"
        if (gender === "Others")
            gen = "O"

        if(dob !== null){
            let changeDateStyle = dob.split('-');
            let day = changeDateStyle[0];
            let month = changeDateStyle[1];
            let year = changeDateStyle[2];
    
            dateStyleOnServer = year + "-" + month + "-" + day;    
        }
        
            
        let payload = {
            "id":child_information.user_id,
            "password": "121211",
            "username": child_information.name,
            "name": child_information.name,
            "gender": gen,
            "dob": dob !== null ? dateStyleOnServer : null,
        }

        if(profileImage !== null){
            payload.avatar = profileImage.id;
        }

        if(edit_user_profile){
            payload.avatar = profileImage.id;
            console.log(`USER DATA +++++++ : ${child_information.name} : ${gen} : ${dob} : ${account.avatar[0].id}` );
        }


        let data = { user_id: child_information.user_id };
        // let data = { user_id: current_user.id };

        console.log(` Log of Payload : ${payload.name} : ${payload.gender} : ${payload.dob} : ${payload.avatar}`)

        edit_user_profile ? 
        services
        .base_service(urls.edit_user_by_id,data, payload)
        .then((response) => {
        getCurrentUserAction();
            console.log('Edit User response: ', response);
            props.setCurrentUserFetchLoadingAction(false);

        })
        .catch((error) => {
            console.log('fetch categories error: ', error);
            props.setCurrentUserFetchLoadingAction(false);

        }) :
        services
            .base_service(urls.user_register, payload)
            .then((response) => {
        getCurrentUserAction();
                console.log('Create User response: ', response);
                props.setCurrentUserFetchLoadingAction(false);

            })
            .catch((error) => {
                console.log('fetch categories error: ', error);
                props.setCurrentUserFetchLoadingAction(false);

            });
        navigation.pop();
        // navigation.replace("Home");
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
            account={account}
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