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
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
              <Bot className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              How can I help you today?
            </h1>
            <p className="text-muted-foreground text-center max-w-md">
              I'm your self-learning AI agent. Ask me anything and I'll do my best to assist you.
            </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSend={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
