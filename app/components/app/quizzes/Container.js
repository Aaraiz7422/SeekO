import React, { Component, useEffect, useState } from 'react';

//Import Plugins and Libraries

//Import Global Components

//Import Local Components
import QuizzesComponent from './Component';

//Import global variables and constants

//Import Redux components and actions
import { setCurrentUserFetchLoading } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../redux/actions/userActions';

//Import Services and APIs
import services from '../../../api/services';
import { urls } from '../../../api/urls';

const QuizzesContainer = (props) => {

    const [quiz_data, set_Quiz_Data] = useState(null);
    const [current_question_index, set_Current_Question_Index] = useState(0);
    const [selected_quiz, set_Selected_Quiz] = useState(null);
    const [submitting_quiz, set_Submitting_Quiz] = useState(false);
    const [fetching_quiz_data, set_Fetching_Quiz_Data] = useState(false);
    const [fetching_quiz_data_error, set_Fetching_Quiz_Data_Error] = useState(false);
    const [attempted_quiz_data, set_Attempted_Quiz_Data] = useState([]);
    const [quiz_answers_indexes_list, set_Quiz_Answers_Indexes_List] = useState({});
    const [show_quiz_submit_button, set_Show_Quiz_Submit_Button] = useState(false);
    const [tab_data, set_Tab_Data] = useState(null);

    const {account} = props.route.params;


    useEffect(() => {
        console.log('Tab Data in Quizz: ', props.route.params.tab_data);
        if (props.route.params.tab_data) {
            set_Tab_Data(props.route.params.tab_data);
        }
        if (props.route.params.selected_quiz !== undefined) {
            let s_quiz = props.route.params.selected_quiz;
            console.log('selected_quiz set', s_quiz);
            set_Selected_Quiz(s_quiz);
            // if (selected_quiz !== null) {
            //     fetchQuizData();
            // }
        }
    }, []);

    useEffect(() => {
        if (selected_quiz !== null) {
            fetchQuizData();
        }
    }, [selected_quiz]);

    useEffect(() => {
        console.log("Error Updateddddddddddddddddddddddd");
    }, [
        submitting_quiz,
        fetching_quiz_data,
        fetching_quiz_data_error,
    ])

    const fetchQuizData = () => {
        setLoadingAndErrorState(true, false, false);
        let data = { quiz_id: selected_quiz.id };
        services
            .base_service(urls.get_quiz_by_id, data)
            .then((response) => {
                console.log('quiz data response: ', response);
                set_Quiz_Data(response);
                setLoadingAndErrorState(false, false, false);
            })
            .catch((error) => {
                setLoadingAndErrorState(false, true, false);
                console.log('fetch quiz error: ', error);
            });
    };

    const setLoadingAndErrorState = (
        fetching_quiz_data,
        fetching_quiz_data_error,
        submitting_quiz,
    ) => {
        set_Fetching_Quiz_Data(fetching_quiz_data);
        set_Fetching_Quiz_Data_Error(fetching_quiz_data_error);
        set_Submitting_Quiz(submitting_quiz);
    }

    const onNextQuestion = () => {
        set_Current_Question_Index((prevState) => (quiz_data.questions.length === prevState + 1 ? prevState : prevState + 1));
    }

    const onPreviousQuestion = () => {
        set_Current_Question_Index((prevState) => (prevState === 0 ? prevState : prevState - 1));
    }

    const onSelectionOfQuizOption = (question, option) => {
        let already_answered = false;
        let selected_answer = { question_id: question.id, option_id: option.id };
        let temp_attempted_quiz_data = attempted_quiz_data.map(
            (attempted_answer) => {
                if (attempted_answer.question_id === selected_answer.question_id) {
                    attempted_answer.option_id = selected_answer.option_id;
                    already_answered = true;
                    return attempted_answer;
                }
                return attempted_answer;
            },
        );
        if (!already_answered) {
            temp_attempted_quiz_data.push(selected_answer);
        }
        quiz_answers_indexes_list[question.id] = option.id;
        console.log('attempted_quiz_data: ', temp_attempted_quiz_data);
        // may be this function not needed set_Quiz_Answers_Indexes_List()
        set_Quiz_Answers_Indexes_List(quiz_answers_indexes_list);
        setTimeout(() => {
            set_Attempted_Quiz_Data(temp_attempted_quiz_data);
            set_Current_Question_Index((prevState) => (quiz_data.questions.length === prevState + 1 ? prevState : prevState + 1));
            set_Show_Quiz_Submit_Button(() => (quiz_data.questions.length === current_question_index + 1));
        }, 300);
    }

    const fetchChildQuizProgress = (submitResponse) => {
        const { navigation, child_user_account } = props;
        console.log('CURRENT CHILD ACCOUNT: ', child_user_account.id);
        console.log("SSSSSSSSS ........... ::: ", submitResponse);
        let data1 = { user_id: child_user_account.id };
        services
            .base_service(urls.track_progress, data1)
            .then((response) => {
                console.log('quiz progress response: ', JSON.stringify(response));
                // setLoadingAndErrorState(false, false);
                quiz_result = response;
                console.log("Quiz Result ............", response);

                navigation.navigate('QuizResult', {account:account, quiz_progress_data: response, quiz_result_data: submitResponse, selected_quiz, tab_data, child_user_account: child_user_account, selected_topic_title: props.route.params.selected_topic_title });
            })
            .catch((error) => {
                // setLoadingAndErrorState(false, true);
                console.log('fetch quiz progress error: ', error);
            });
    };

    const submitQuiz = () => {
        const { navigation, child_user_account } = props;
        setLoadingAndErrorState(false, false, true);
        console.log('CHILD USER ACCOUNT: ', child_user_account);
        console.log('SUBMIT ANSWERS: ', attempted_quiz_data);
        let data = { quiz_id: selected_quiz.id };
        let payload = {
            answers: attempted_quiz_data,
            user_id: child_user_account.id,
        };

        services
            .base_service(urls.attempt_quiz, data, payload)
            .then((response) => {
                console.log('attempt quiz data response: ', response);
                console.log("Selected Topic", props.selected_topic_redux);
                fetchChildQuizProgress(response);
                setLoadingAndErrorState(false, false, false);
            })
            .catch((error) => {
                setLoadingAndErrorState(false, false, false);
                console.log('fetch categories error: ', error);
            });
    }
    return (
        <QuizzesComponent
            {...props}
            account={account}
            quiz_data={quiz_data}
            current_question_index={current_question_index}
            selected_quiz={selected_quiz}
            submitting_quiz={submitting_quiz}
            fetching_quiz_data={fetching_quiz_data}
            fetching_quiz_data_error={fetching_quiz_data_error}
            attempted_quiz_data={attempted_quiz_data}
            quiz_answers_indexes_list={quiz_answers_indexes_list}
            show_quiz_submit_button={show_quiz_submit_button}
            tab_data={tab_data}
            fetchQuizData={fetchQuizData}
            onSelectionOfQuizOption={onSelectionOfQuizOption}
            onNextQuestion={onNextQuestion}
            onPreviousQuestion={onPreviousQuestion}
            submitQuiz={submitQuiz}
            selected_topic_title={props.route.params.selected_topic_title}
        />
    );
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        logged_in: state.authReducer.logged_in,
        child_user_account: state.userReducer.child_user_account,
        selected_topic_redux: state.userReducer.selected_topic,
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
export default connect(mapStateToProps, mapDispatchToProps)(QuizzesContainer);
