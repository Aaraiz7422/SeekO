import React, { useState, useEffect } from 'react';

//Import Local Components
import TrackProgressComponent from './Component';

//Import Redux components and actions
import { setCurrentUserFetchLoading } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../redux/actions/userActions';

//Import Services and APIs
import services from '../../../api/services';
import { urls } from '../../../api/urls';

const TrackProgressContainer = (props) => {

    const [quiz_progress_data, set_Quiz_Progress_Data] = useState([]);
    const [fetching_quiz_progress_data, set_Fetching_Quiz_Progress_Data] = useState(false);
    const [fetching_quiz_data_progress_error, set_Fetching_Quiz_Data_Progress_Error] = useState(false);
    const [selected_screen, set_Selected_Screen] = useState(null);
    const [selected_child_account, set_Selected_Child_Account] = useState(null);

    const {account} = props.route.params;

    useEffect(() => {
        if (props.route.params.selected_child_account !== undefined) {
            console.log('props.route.params.selected_child_account: ', props.route.params.selected_child_account,);
            let s_child_account = props.route.params.selected_child_account;
            let s_screen = props.route.params.selected_screen;
            console.log('selected_category set', s_child_account, s_screen,);
            set_Selected_Child_Account(s_child_account);
            set_Selected_Screen(s_screen);
        }
    }, []);

    useEffect(() => {
        if (selected_child_account !== null && selected_screen !== null) {
            fetchChildQuizProgress();
        }
    }, [selected_screen, selected_child_account]);

    useEffect(() => {
        console.log("selected_screen and quiz_progress_data updated in UE", selected_screen, quiz_progress_data);
        console.log("fetching_quiz_progress_data and fetching_quiz_progress_data_error Error updated in UE", fetching_quiz_progress_data, fetching_quiz_data_progress_error);
    }, [fetching_quiz_progress_data, fetching_quiz_data_progress_error, quiz_progress_data])

    const fetchChildQuizProgress = () => {
        setLoadingAndErrorState(true, false);
        // const {selected_child_account} = this.state;
        console.log('SELECTED CHILD ACCOUNT: ', selected_child_account.id);
        let data = { user_id: selected_child_account.id };
        services
            .base_service(urls.track_progress, data)
            .then((response) => {
                console.log('quiz progress response: ', JSON.stringify(response));
                set_Quiz_Progress_Data(response);
                setLoadingAndErrorState(false, false);
            })
            .catch((error) => {
                setLoadingAndErrorState(false, true);
                console.log('fetch quiz progress error: ', error);
            });
    };

    const setLoadingAndErrorState = (fetching_quiz_progress_data, fetching_quiz_data_progress_error,) => {
        set_Fetching_Quiz_Progress_Data(fetching_quiz_progress_data);
        set_Fetching_Quiz_Data_Progress_Error(fetching_quiz_data_progress_error);
    };


    return <TrackProgressComponent {...props} account={account} quiz_progress_data={quiz_progress_data} fetchChildQuizProgress={fetchChildQuizProgress} fetching_quiz_progress_data={fetching_quiz_progress_data} fetching_quiz_data_progress_error={fetching_quiz_data_progress_error} selected_screen={selected_screen} selected_child_account={selected_child_account} />;
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
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
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        setCurrentUserFetchLoadingAction: (loading) =>
            dispatch(setCurrentUserFetchLoading(loading)),
        getCurrentUserAction: () => dispatch(getCurrentUser()),
    };
};

// Exports
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TrackProgressContainer);
