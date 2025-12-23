import { useState } from 'react';
import { User, Sparkles, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [liked, setLiked] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(liked === true ? null : true);
  };

  const handleDislike = () => {
    setLiked(liked === false ? null : false);
  };

  return (
    <div className="message-animate py-5">
      <div className="mx-auto max-w-3xl px-4">
        <div className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}>
          {/* Agent Avatar - Left side */}
          {!isUser && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
          )}

          {/* Content */}
          <div className={cn(
            "max-w-[80%] space-y-2 overflow-hidden pt-0.5",
            isUser ? "text-right" : "text-left"
          )}>
            <p className="text-sm font-semibold text-foreground">
              {isUser ? 'You' : 'Assistant'}
            </p>
            <div className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px]">
              {message.content}
            </div>
            
            {/* Action buttons */}
            <div className={cn(
              "flex items-center gap-1 pt-1",
              isUser ? "justify-end" : "justify-start"
            )}>
              <button
                onClick={handleLike}
                className={cn(
                  "p-1.5 rounded-md transition-colors hover:bg-accent",
                  liked === true ? "text-emerald-500" : "text-muted-foreground"
                )}
                title="Like"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button
                onClick={handleDislike}
                className={cn(
                  "p-1.5 rounded-md transition-colors hover:bg-accent",
                  liked === false ? "text-red-500" : "text-muted-foreground"
                )}
                title="Dislike"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md text-muted-foreground transition-colors hover:bg-accent"
                title="Copy"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* User Avatar - Right side */}
          {isUser && (
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
              <User className="h-4 w-4 text-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
