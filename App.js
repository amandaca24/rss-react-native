import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import { Provider as FeedListProvider } from './src/context/FeedListContext';
import { Provider as FeedProvider } from './src/context/FeedContext';
import AddFeedScreen from './src/screens/AddFeedScreen';
import ShowFeedScreen from './src/screens/ShowFeedScreen';

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Add: AddFeedScreen,
    Show: ShowFeedScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'RSS'
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <FeedListProvider>
      <FeedProvider>
        <App />
      </FeedProvider>
    </FeedListProvider>
  );
};

