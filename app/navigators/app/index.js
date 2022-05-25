//Import Core Components
import React from 'react';
//Import Plugins and Libraries
import { createStackNavigator } from '@react-navigation/stack';
//Import Local Components
import HomeContainer from '../../components/app/home/Container';
import TopicsContainer from '../../components/app/topics/Container';
import QuizzesContainer from '../../components/app/quizzes/Container';
import QuizResultComponent from '../../components/app/quizzes/QuizResultComponent';
// import UserProfileComponent from '../../components/app/UserProfileComponent';
import UserContainer from '../../components/app/users/Container';
import CategoriesContainer from '../../components/app/categories/Container';
import TrackProgressContainer from '../../components/app/track-progress/Container';
import QuizProgressComponent from '../../components/app/track-progress/quiz-progress';
const ApplicationStack = createStackNavigator();
// app navigation container for all app screens other than Authentication screens
function AppNavigationStack() {
    return (
        <ApplicationStack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
            <ApplicationStack.Screen name="Home" component={HomeContainer} />
            {/* <ApplicationStack.Screen name='UserProfile' component={UserProfileComponent}/> */}
            <ApplicationStack.Screen name='CreateUser' component={UserContainer}/>
            <ApplicationStack.Screen name="Categories" component={CategoriesContainer}/>
            <ApplicationStack.Screen name="Topics" component={TopicsContainer} />
            <ApplicationStack.Screen name="Quizzes" component={QuizzesContainer}/>
            <ApplicationStack.Screen name="QuizResult" component={QuizResultComponent}/>
            <ApplicationStack.Screen name="TrackProgress" component={TrackProgressContainer}/>
            <ApplicationStack.Screen name="QuizProgress" component={QuizProgressComponent}/>
        </ApplicationStack.Navigator>
    );
}

export default AppNavigationStack;
