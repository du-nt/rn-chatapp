import React, {useState, useRef, useEffect} from 'react';
import {useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import SceneComponent from './SceneComponent';
import LazySceneComponent from './LazySceneComponent';

export type RouteType = {
  key: string;
  title: string;
};

export default function TabViewScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const prevIndex = useRef(index);

  const [routes] = useState([
    {key: '0', title: 'For you'},
    {key: '1', title: 'Top charts'},
    {key: '2', title: 'Kids'},
    {key: '3', title: 'Events'},
    {key: '4', title: 'New'},
  ]);

  useEffect(() => {
    prevIndex.current = index;
  }, [index]);

  const renderScene = ({route}: {route: RouteType}) => {
    if (Math.abs(index - routes.indexOf(route)) === 0) {
      return Math.abs(index - prevIndex.current) > 1 ? (
        <LazySceneComponent route={route} />
      ) : (
        <SceneComponent route={route} />
      );
    }
    return null;
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled
          inactiveColor="#333"
          pressColor="#eee"
          tabStyle={{width: 100}}
          indicatorStyle={styles.indicator}
          style={styles.tabBarContainer}
          renderLabel={({route}) => {
            return (
              <Text
                style={
                  routes.indexOf(route) === index
                    ? styles.activedTab
                    : styles.tab
                }>
                {route.title}
              </Text>
            );
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  safeViewArea: {
    flex: 1,
    backgroundColor: '#eee',
  },
  tabBarContainer: {
    backgroundColor: '#eee',
  },
  tab: {
    color: '#333',
    margin: 4,
  },
  activedTab: {
    color: 'green',
    margin: 4,
  },
  indicator: {
    backgroundColor: 'green',
    height: 4,
    width: 60,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    left: (100 - 60) / 2,
  },
});
