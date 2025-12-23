import { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import type { ChatSession } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';

interface ChatAreaProps {
  session: ChatSession;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatArea({ session, isLoading, onSendMessage }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, isLoading]);

  const hasMessages = session.messages.length > 0;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-background">
        {hasMessages ? (
          <div className="pb-4">
            {session.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          /* Empty State */
          <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 mb-5">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              How can I help you today?
            </h1>
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSend={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
