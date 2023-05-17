import Image from "next/image";
import { Lily_Script_One } from "next/font/google";

import HackAIthonLogo from "@/public/hackaithon.png";
import { cn } from "@/lib/utils";

const logoFont = Lily_Script_One({
  subsets: ["latin"],
  weight: "400",
});

export function Header() {
  return (
    <header className="flex justify-between py-4 items-center border-b">
      <p className={cn("text-[#30a46c] text-3xl", logoFont.className)}>mimo</p>
      <Image
        className="filter invert"
        src={HackAIthonLogo}
        alt="HackAIthon Logo"
        width={200}
      />
    </header>
  );
}
