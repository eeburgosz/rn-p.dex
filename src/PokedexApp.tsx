import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const PokedexApp = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

//! El <ThemeContextProvider> me lo traigo del context porque éste me está retornando el <PaperProvider> y el <NavigationContainer>, que según las documentaciones, deberían estar aquí, pero como ambos manejan los "themes", me los llevé al context.
