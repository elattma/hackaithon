"use client";

import { Chat } from "@/components/chat";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="container min-h-screen max-h-screen flex flex-col">
      <Header />
      <Chat />
    </div>
  );
}
