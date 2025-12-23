import { Sidebar } from '@/components/chat/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    isLoading,
    sendMessage,
    createNewSession,
    deleteSession,
  } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={createNewSession}
        onDeleteSession={deleteSession}
      />

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden">
        <ChatArea
          session={activeSession}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </main>
    </div>
  );
};

export default Index;
