import { Plus, MessageSquare, Trash2, User } from 'lucide-react';
import type { ChatSession } from '@/types/chat';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

export function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-[260px] flex-col bg-sidebar">
      {/* New Chat Button */}
      <div className="p-2 pt-3">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
        >
          <MessageSquare className="h-4 w-4" />
          New conversation
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-thin">
        <div className="space-y-1 py-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors cursor-pointer",
                activeSessionId === session.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
              onClick={() => onSelectSession(session.id)}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{session.title}</span>
              
              {/* Delete button - shows on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 transition-opacity"
                aria-label="Delete conversation"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">User</p>
            <p className="text-xs text-muted-foreground truncate">user_001</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
