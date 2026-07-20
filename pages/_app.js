import "@/styles/globals.css";
import HeaderLayout from "@/components/templates/HeaderLayout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps  }) {
  const router = useRouter();

  const hideHeader = router.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {!hideHeader && <HeaderLayout userStatus={pageProps.user} />}
      <main className="flex-1">
        <Component {...pageProps} />;
      </main>
    </div>
  );
}

