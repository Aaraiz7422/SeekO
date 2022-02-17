import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeContainer from '../../components/app/home/Container';
// import CategoriesContainer from '../../components/app/categories';
import TopicGuideComponent from '../../components/app/TopicGuideComponent';
import TopicProgressComponent from '../../components/app/TopicProgressComponent';
import StartQuizComponent from '../../components/app/StartQuizComponent';
import TopicsContainer from '../../components/app/topics/Container';
import TopicDetailComponent from '../../components/app/TopicDetailComponent';
import QuizzesContainer from '../../components/app/quizzes/Container';
import QuizResultComponent from '../../components/app/quizzes/QuizResultComponent';
import UserProfileComponent from '../../components/app/UserProfileComponent';
import UserContainer from '../../components/app/users/Container';
import CategoriesContainer from '../../components/app/categories/Container';
import TrackProgressContainer from '../../components/app/track-progress/Container';
import QuizProgressComponent from '../../components/app/track-progress/quiz-progress';
const ApplicationStack = createStackNavigator();

function AppNavigationStack() {
    return (
        <ApplicationStack.Navigator headerMode="none">
            <ApplicationStack.Screen name="Home" component={HomeContainer} />
            <ApplicationStack.Screen name='UserProfile' component={UserProfileComponent}/>
            <ApplicationStack.Screen name='CreateUser' component={UserContainer}/>
            <ApplicationStack.Screen name="Categories" component={CategoriesContainer}/>
            <ApplicationStack.Screen name="Topics" component={TopicsContainer} />
            <ApplicationStack.Screen name="TopicDetail" component={TopicDetailComponent}/>
            <ApplicationStack.Screen name="TopicGuide" component={TopicGuideComponent} />
            <ApplicationStack.Screen name="TopicProgress" component={TopicProgressComponent} />
            <ApplicationStack.Screen name="StartQuiz" component={StartQuizComponent} />
            <ApplicationStack.Screen name="Quizzes" component={QuizzesContainer}/>
            <ApplicationStack.Screen name="QuizResult" component={QuizResultComponent}/>
            <ApplicationStack.Screen name="TrackProgress" component={TrackProgressContainer}/>
            <ApplicationStack.Screen name="QuizProgress" component={QuizProgressComponent}/>
        </ApplicationStack.Navigator>
    );
}

export default AppNavigationStack;
