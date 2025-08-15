import Toast from "@/components/toast/toast";
import { ToastProvider } from "@/contexts/toast-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
      <Toast />
    </ToastProvider>
  )
}
