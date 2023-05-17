"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function StartingInput() {
  const [input, setInput] = useState<string>("");

  const startAgent: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form className="flex items-center gap-2" onSubmit={startAgent}>
      <Input
        aria-label="Describe what Raina should do"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button>Submit</Button>
    </form>
  );
}
