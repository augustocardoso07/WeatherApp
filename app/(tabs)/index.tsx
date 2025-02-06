import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherScreen } from "@/features/weather/components/WeatherScreen";

const queryClient = new QueryClient();

export default function TabOneScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherScreen />
    </QueryClientProvider>
  );
}
