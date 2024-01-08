import { Html, Head, Main, NextScript } from "next/document";
import { Toaster, toast } from "sonner";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Toaster richColors position="top-center" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
