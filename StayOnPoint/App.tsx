import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Import navigator
import AppNavigator from './src/navigation/AppNavigator';
// Import services for initialization
import { initPromptService } from './src/services/promptService';
import { initPracticeHistory } from './src/services/practiceHistoryService';
import { initPreferences } from './src/services/preferencesService';

const App = () => {
  useEffect(() => {
    // Initialize all services when app starts
    const initializeApp = async () => {
      try {
        await Promise.all([
          initPromptService(),
          initPracticeHistory(),
          initPreferences()
        ]);
      } catch (error) {
        console.error('Failed to initialize app services:', error);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
