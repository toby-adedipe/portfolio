"use client";

import { useState } from "react";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { Navigation } from "@/components/Navigation";
import { useCommandPalette } from "@/hooks/useCommandPalette";

interface ClientWrapperProps {
  name: string;
}

export function ClientWrapper({ name }: ClientWrapperProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isOpen: isPaletteOpen, close: closePalette } = useCommandPalette();

  return (
    <>
      <Navigation name={name} />
      <ScrollProgress />

      <ChatBubble onClick={() => setIsChatOpen(true)} />
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <CommandPalette isOpen={isPaletteOpen} onClose={closePalette} />
    </>
  );
}
