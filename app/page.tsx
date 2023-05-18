"use client";

import { Chat } from "@/components/chat";
import { Header } from "@/components/header";

const redirectUri = "http://localhost:3000";

export default function Home() {
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // // TODO: move to chat component
  // useEffect(() => {
  //   const state = searchParams?.get("state");
  //   // TODO: set state as all the data?
  //   const code = searchParams?.get("code");
  //   if (state && code) {
  //     router.replace("");
  //     fetch("https://api.linear.app/oauth/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: JSON.stringify({
  //         code: code,
  //         redirect_uri: redirectUri,
  //         client_id: "137631944f33a86d6685a6927a2441ac",
  //         client_secret: process.env.LINEAR_CLIENT_SECRET,
  //         grant_type: "authorization_code",
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // TODO: set state accessToken and make request to backend
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);

  return (
    <div className="container min-h-screen max-h-screen flex flex-col">
      <Header />
      <Chat />
    </div>
  );
}
