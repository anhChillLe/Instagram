import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

function MyComponent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: 0 }}>
      <Text>Hello, safe area!</Text>
    </View>
  );
}

export default function Test() {
  return (
    <SafeAreaProvider>
      <MyComponent />
    </SafeAreaProvider>
  );
}