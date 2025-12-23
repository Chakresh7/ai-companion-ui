import { User, Sparkles } from 'lucide-react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className="message-animate py-5">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
              isUser 
                ? "bg-accent" 
                : "bg-emerald-600"
            )}
          >
            {isUser ? (
              <User className="h-4 w-4 text-foreground" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1.5 overflow-hidden pt-0.5">
            <p className="text-sm font-semibold text-foreground">
              {isUser ? 'You' : 'ChatGPT'}
            </p>
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
