import '../styles/globals.css'
import { AppProps } from 'next/app'
import Layout from "../components/layout";
import {ToastContainer} from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  );
}
