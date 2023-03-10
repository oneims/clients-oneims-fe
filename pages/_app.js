import "react-loading-skeleton/dist/skeleton.css";
import "../styles/style.scss";
import { AppWrapper } from "../context/AppWrapper";

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
