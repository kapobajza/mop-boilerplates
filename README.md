# MoP React/React Native Boilerplates

Welcome! These are some of the boilerplates I've created so that they can be, hopefully, useful to someone.

There are several components/hooks that are included, namely:
- Flash message component - a handy component to display a message at the top of your device
- Full screen loading component - a component to display a loading screen
- `useLoading` hook - a hook that can be used when you need to use loading in your state
- `useLoadMore` hook - a hook that simplifies infinite scrolling/loading more content in your `FlatList`s

#### Flash message component

This component consists of `React` context, a hook to use it anywhere you want and the component that's gonna be displayed. In order to use it in your app, first you have to include the `FlashMessageProvider` preferably in your main `App.tsx` file:

```
import { FlashMessageProvider } from './src/components/FlashMessage';

export default function App() {
  return (
    // other providers, like SafeAreaProvider or StoreProvider, etc.
    <FlashMessageProvider>
      // ... other children
    </FlashMessageProvider>
  );
}
```

Now you can simply use it inside of your components like this:

```
export default function Home() {
  const { showSuccess, showError, showInfo } = useFlashMessage();

  return (
    <View>
      <Button title="Show success message" onPress={() => showSuccess('Success message')} />
      <Button title="Show error message" onPress={() => showError(new Error('Error message'))} />
      <Button title="Show info message" onPress={() => showSuccess('Info message')} />
    </View>
  );
}
```

**Note: `showSuccess` and `showInfo` are expecting a `string` as an argument, whereas `showError` expects an `Error` as an argument, as you can see in the example above. That's because you can easily handle displaying errors in a `try/catch` block, like this:**

```
const { showError } = useFlashMessage();

const someAsyncFunction = async () => {
  try {
    // Do some async work, like make an HTTP request or similar
  } catch (err) {
    showError(err);
  }
}
```
