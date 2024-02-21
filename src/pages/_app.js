import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import store from "@/store";
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
    </>
  )

}
