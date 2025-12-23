import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="message-animate py-6 bg-chat-agent/30">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent border border-border">
            <Bot className="h-4 w-4 text-foreground" />
          </div>

          {/* Typing dots */}
          <div className="flex items-center gap-1 pt-3">
            <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
            <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
            <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
