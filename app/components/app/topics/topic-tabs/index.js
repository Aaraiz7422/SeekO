import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarItem,
} from 'react-native-tab-view';
import { SCREEN_WIDTH } from '../../../../../constants';
import global from '../../../../../global-styles';
import services from '../../../../api/services';
import { urls } from '../../../../api/urls';
import TopicContentContainer from '../topic-content';
import { ProgressBar} from 'react-native-paper';
const initialLayout = {
  width: SCREEN_WIDTH * 0.9,
};


// *** renderLabel and renderTabBarItem ***//
// *** renderLabel is for showing TabBar title Text ***//
// *** renderTabBarItem render no.of the Label using _renderTabBar 
// *** call inside <TabBar renderTabBarItem={renderTabBarItem} > like this ***// 

//*** uncomment renderLabel and renderTabBarItem for showing tabs(with label) ***/
// const renderLabel = ({ route, focused }) => {
//     return (
//       <View
//         key={route.id}
//         style={[
//           styles.label,
//           focused && styles.selected_tab,
//           {
//             marginRight: focused ? 12 : 0,
//           },
//         ]}
//         >
//         <Text
//           style={global.regular_bold_family}>
//           {route.title}
//       </Text>
//     </View>
//     );
// };
// const renderTabBarItem = (props) => {
//   return (
//     <TabBarItem
//         {...props}
//         renderLabel={renderLabel}
//     />
//   );
// };

const TopicTabsContainer = (props) => {

  const [index, setIndex] = useState(0);
  const [selected_tab, setSelectedTab] = useState(null);
  const [tab_associated_data, setTabAssociatedData] = useState(null);
  const [fetching_tab_data, setFetchingTabData] = useState(false);
  const [fetching_tab_data_error, setFetchingTabDataErro] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [data_source_coords, set_Data_Source_Cords] = useState([]);
  const [onSwipeStart, set_On_Swipe_Start] = useState(false);
  const horizontal_scroll_bar = useRef(null);

  let progress_calculation = (index + 1) / routes.length;
  useEffect(() => {
    props.routes &&
      props.routes.length > 0 &&
      props.routes.forEach((tab) => {
        routes.push(tab);
      });

    if (props.routes.length > 0) {
      setSelectedTab(props.routes[0]);
    }
  }, [])

  useEffect(() => {
    if (data_source_coords.length === routes.length) {
      if (index === 0 ) {
        console.log('Not Null');
        // horizontal_scroll_bar.current.scrollTo({ animated: true, offset: 0 });
      } else {
        scrollHandler();
      }
    }
    if (data_source_coords.length > 0) {
      scrollHandler();
    }
  }, [ data_source_coords,index]);

  const setOnSwipeStart = (onSwipeStart) => {
    set_On_Swipe_Start(onSwipeStart);
  }

  const scrollHandler = () => {
    // const { data_source_coords } = this.state;
    // const { index } = this.state;
    if (data_source_coords.length > index) {
      // horizontal_scroll_bar.current.scrollTo({
      //   x: data_source_coords[index] - 8,
      //   y: 0,
      //   animated: true,
      // });
    }
  };

  // *** setDataSourceCords and fetTabContent not used anywher ***//

  // const setDataSourceCords = (key, value) => {
  //   let d_source_coords = data_source_coords;
  //   d_source_coords[key] = value;
  //   set_Data_Source_Cords((prevState) => [prevState,...d_source_coords]);
  //   // this.setState({ data_source_coords: [...d_source_coords] });
  // }

  // const fetchTabContent = () => {
  //   setLoadingAndErrorState(true, false);
  //   // const {selected_tab} = this.state;
  //   let data = {tab_id: selected_tab.id};
  //   services
  //     .base_service(urls.get_content_by_tab, data)
  //     .then((response) => {
  //       console.log('fetchTabContent: ', response);
  //       setTabAssociatedData(response);
  //       setLoadingAndErrorState(false, false);
  //     })
  //     .catch((error) => {
  //       setLoadingAndErrorState(false, true);
  //       console.log('tab_associated_data  error: ', error);
  //     });
  // };

  const handleIndexChange = (index) => {
    console.log('handleIndexChange: ', index);
    setIndex(index);
    setSelectedTab(routes[index]);
  };

  // *** setLoadingAndErrorState not used anywhere
  // const setLoadingAndErrorState = (fetching_tab_data, fetching_tab_data_error) => {
  //   setFetchingTabData(fetching_tab_data);
  //   setFetchingTabDataErro(fetching_tab_data_error);
  // };
  const _renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        bounces={false}
        // ref={(o) => horizontal_scroll_bar.current = o}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tab_bar}
        tabStyle={styles.tab}
      // *** uncomment the renderTabBarItem={renderTabBarItem} (line 151) to render your tabs and set height:34 in tab_bar styles in stylesheet ***// 
      // renderTabBarItem={renderTabBarItem}
      />
    );
  };

  const renderScene = ({ route }) => {
    const { parent_data } = props;
    if (Math.abs(index - routes.indexOf(route)) > 5 && onSwipeStart) {
      return <View />;
    }
    return (
      <TopicContentContainer
        {...props}
        key={index}
        topic_associated_data={route}
        parent_data={parent_data}
        tab_data={selected_tab}
      />
    );
  };

  return (
    <View
      style={[
        global.page_container_with_aligned_flex_start,
        { paddingTop: 0 },
      ]}>
      {
        routes.length > 0 &&
        <>
          <ProgressBar progress={progress_calculation}
            style={{
              width: SCREEN_WIDTH * 0.84,
              height: 18,
              borderRadius: 10,
              borderColor: 'rgba(0, 0, 0, 0.19)',
              borderWidth: 2,
              backgroundColor: "#F5F8FF",
              marginTop: 10,
          }}
          color={"#01CCAD"}
            
 
            />
          <TabView
          
          transitionStyle='scroll'
          lazy
            navigationState={{ index, routes }}
            swipeEnabled={true}
            renderScene={renderScene}
            renderTabBar={_renderTabBar}
            initialLayout={initialLayout}
            onIndexChange={handleIndexChange}
            onSwipeStart={() => {
              console.log('onSwipeStart');
              setOnSwipeStart(true);
            }}
            onSwipeEnd={() => {
              console.log('onSwipeEnd');
              setOnSwipeStart(false);
            }}
          />
        </>
      }
    </View>
  );
}

export default TopicTabsContainer;
const styles = StyleSheet.create({
  tab_bar: {
    // *** for showing tabs you just need to set height:34 
    // *** for hiding tabs you just need to set height:0
    // height:34,
    height: 0,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor:'transparent'
  },
  indicatorContainerStyle: {
    display: 'none',
  },
  indicator: {
    backgroundColor: 'transparent',
    height: 0, width: 0, opacity: 0,
  },
  tab: {
    width: 'auto',
    minWidth: 60,
    minHeight: 32,
    height: 32,
    maxHeight: 32,
    flexDirection: 'row',
    paddingTop: 0,
    padding: 0,
    marginLeft: 10,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minWidth: 60,
    paddingHorizontal: 18,
    height: 32,
    maxHeight: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  selected_tab: {
    backgroundColor: 'white',
  },
});
