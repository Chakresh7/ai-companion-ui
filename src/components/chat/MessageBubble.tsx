import { User, Bot } from 'lucide-react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("message-animate py-6", isUser ? "bg-transparent" : "bg-chat-agent/30")}>
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              isUser ? "bg-primary" : "bg-accent border border-border"
            )}
          >
            {isUser ? (
              <User className="h-4 w-4 text-primary-foreground" />
            ) : (
              <Bot className="h-4 w-4 text-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2 overflow-hidden">
            <p className="text-sm font-medium text-foreground">
              {isUser ? 'You' : 'Agent'}
            </p>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
