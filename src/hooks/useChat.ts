import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Message, ChatSession, WebhookPayload } from '@/types/chat';

const WEBHOOK_URL = 'http://localhost:5678/webhook-test/b500ee1f-9729-4fc3-94fd-abe17011ea19';
const USER_ID = 'user_001';

export function useChat() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const initialSession: ChatSession = {
      id: uuidv4(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return [initialSession];
  });
  
  const [activeSessionId, setActiveSessionId] = useState<string>(() => sessions[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setError(null);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add user message immediately
    setSessions(prev => prev.map(session => {
      if (session.id === activeSessionId) {
        const updatedMessages = [...session.messages, userMessage];
        const title = session.messages.length === 0 
          ? content.trim().slice(0, 30) + (content.length > 30 ? '...' : '')
          : session.title;
        return {
          ...session,
          messages: updatedMessages,
          title,
          updatedAt: new Date(),
        };
      }
      return session;
    }));

    setIsLoading(true);
    setError(null);

    const payload: WebhookPayload = {
      user_id: USER_ID,
      message: content.trim(),
      session_id: activeSessionId,
      context: {
        level: 'beginner',
        topic: 'agentic_ai',
      },
      feedback: null,
      metadata: {
        source: 'web_ui',
        language: 'en',
      },
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      const agentMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: typeof data === 'string' ? data : data.message || data.response || JSON.stringify(data),
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, agentMessage],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      // Add error message as agent response
      const errorAgentMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: `I'm sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [...session.messages, errorAgentMessage],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId, isLoading]);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (filtered.length === 0) {
        const newSession: ChatSession = {
          id: uuidv4(),
          title: 'New conversation',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return [newSession];
      }
      return filtered;
    });
    
    if (activeSessionId === sessionId) {
      setSessions(prev => {
        setActiveSessionId(prev[0].id);
        return prev;
      });
    }
  }, [activeSessionId]);

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    isLoading,
    error,
    sendMessage,
    createNewSession,
    deleteSession,
  };
}
