export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookPayload {
  user_id: string;
  message: string;
  session_id: string;
  context: {
    level: string;
    topic: string;
  };
  feedback: null;
  metadata: {
    source: string;
    language: string;
  };
}
