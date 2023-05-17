import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { StartingInput } from "@/components/starting-input";

export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col">
      <Header />
      <Chat />
    </div>
  );
}
