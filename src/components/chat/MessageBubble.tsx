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
        <div className={cn("flex gap-4", isUser ? "justify-start" : "justify-end")}>
          {/* User Avatar - Left side */}
          {isUser && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
              <User className="h-4 w-4 text-foreground" />
            </div>
          )}

          {/* Content */}
          <div className={cn(
            "max-w-[80%] space-y-1.5 overflow-hidden pt-0.5",
            isUser ? "text-left" : "text-right"
          )}>
            <p className="text-sm font-semibold text-foreground">
              {isUser ? 'You' : 'Assistant'}
            </p>
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]">
              {message.content}
            </div>
          </div>

          {/* Agent Avatar - Right side */}
          {!isUser && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
