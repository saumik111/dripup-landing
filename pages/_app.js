import { useEffect } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/400-italic.css";
import { clearAskMessagesOnPageRefresh } from "@/lib/askSession";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    clearAskMessagesOnPageRefresh();
  }, []);

  return <Component {...pageProps} />;
}
