import { useState } from 'react';
import { User, Sparkles, ThumbsUp, ThumbsDown, Copy, Check, RotateCcw, Volume2, MoreHorizontal } from 'lucide-react';
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
    <div className="py-6">
      <div className="mx-auto max-w-3xl px-4">
        <div className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}>
          {/* Agent Avatar - Left side */}
          {!isUser && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          )}

          {/* Content */}
          <div className={cn(
            "flex-1 max-w-[85%] space-y-3",
            isUser ? "text-right" : "text-left"
          )}>
            <div className="text-foreground leading-7 whitespace-pre-wrap text-[15px]">
              {message.content}
            </div>
            
            {/* Action buttons - Only show for agent messages */}
            {!isUser && (
              <div className="flex items-center gap-1 pt-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <button
                  className="p-2 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Read aloud"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button
                  onClick={handleLike}
                  className={cn(
                    "p-2 rounded-lg transition-colors hover:bg-accent hover:text-foreground",
                    liked === true ? "text-foreground" : "text-muted-foreground"
                  )}
                  title="Good response"
                >
                  <ThumbsUp className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDislike}
                  className={cn(
                    "p-2 rounded-lg transition-colors hover:bg-accent hover:text-foreground",
                    liked === false ? "text-foreground" : "text-muted-foreground"
                  )}
                  title="Bad response"
                >
                  <ThumbsDown className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Regenerate"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="More"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* User Avatar - Right side */}
          {isUser && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
              <User className="h-4 w-4 text-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
