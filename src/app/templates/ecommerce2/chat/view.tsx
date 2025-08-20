"use client";
import * as React from 'react'
import { ChatComponent, type ChatMessage, type Participant } from "@/app/components/Chat";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, MonitorUp } from 'lucide-react'
import { ProfileSheet, type User } from './ProfileSheet'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Conversation = {
  id: string
  participant: Participant
  last: { text: string; time: string; state: 'read'|'sent' }
  unread: number
  messages: ChatMessage[]
}

const initialConversations: Conversation[] = [
  {
    id: 'c1',
    participant: { name: 'Jacquenetta Slowgrave', avatar: 'https://bundui-images.netlify.app/avatars/01.png', status: 'online' },
    last: { text: 'Great! Looking forward to it. See you later!', time: '10 minutes', state: 'sent' },
    unread: 8,
    messages: [
      { id: 'm1', role: 'agent', content: 'Great! Looking forward to it. See you later!', timestamp: '05:23 PM', status: 'read' },
    ]
  },
  {
    id: 'c2',
    participant: { name: 'Nickola Peever', avatar: 'https://bundui-images.netlify.app/avatars/02.png', status: 'online' },
    last: { text: "Sounds perfect! I've been wanting to try that place. See you there!", time: '40 minutes', state: 'read' },
    unread: 2,
    messages: [
      { id: 'm1', role: 'agent', content: "Sounds perfect! I've been wanting to try that place. See you there!", timestamp: '05:23 PM', status: 'read' },
    ]
  },
  {
    id: 'c3',
    participant: { name: 'Farand Hume', initials: 'FH', status: 'online' },
    last: { text: 'How about 7 PM at the new Italian place downtown?', time: 'Yesterday', state: 'read' },
    unread: 0,
    messages: [
      { id: 'm1', role: 'agent', content: 'How about 7 PM at the new Italian place downtown?', timestamp: '05:23 PM', status: 'read' },
    ]
  },
]

export default function ChatView() {
  const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations)
  const [selectedId, setSelectedId] = React.useState<string>(conversations[0]?.id ?? '')
  const [viewingProfile, setViewingProfile] = React.useState<User | null>(null)
  const [call, setCall] = React.useState<{ type: 'audio'|'video'|'screen'; participant: Participant } | null>(null)

  const selected = conversations.find(c => c.id === selectedId) ?? conversations[0]

  const handleSend = (text: string) => {
    const time = new Date()
    const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setConversations(prev => prev.map(c => {
      if (c.id !== selected.id) return c
      const nextMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: text, timestamp: timeStr, status: 'sent' }
      return {
        ...c,
        messages: [...c.messages, nextMsg],
        last: { text, time: 'now', state: 'sent' },
        unread: 0
      }
    }))
    // Optional: simulate delivery/read after short delay
    // Simulate delivery after 500ms
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id !== selected.id) return c
        const lastIdx = c.messages.length - 1
        if (lastIdx < 0) return c
        const updated = [...c.messages]
        updated[lastIdx] = { ...updated[lastIdx], status: 'delivered' as const }
        return { ...c, messages: updated }
      }))
    }, 500)
    // Simulate read after 1500ms
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id !== selected.id) return c
        const lastIdx = c.messages.length - 1
        if (lastIdx < 0) return c
        const updated = [...c.messages]
        updated[lastIdx] = { ...updated[lastIdx], status: 'read' as const }
        return { ...c, messages: updated, last: { ...c.last, state: 'read' } }
      }))
    }, 1500)
  }

  const handleSendAudio = (audio: { url: string; blob: Blob; durationSec: number }) => {
    const time = new Date()
    const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setConversations(prev => prev.map(c => {
      if (c.id !== selected.id) return c
      const nextMsg: ChatMessage = {
        id: `m${Date.now()}`,
        role: 'user',
        content: '',
        timestamp: timeStr,
        status: 'sent',
        kind: 'audio',
        audioUrl: audio.url,
        audioDurationSec: audio.durationSec,
      }
      return {
        ...c,
        messages: [...c.messages, nextMsg],
        last: { text: `[audio • ${audio.durationSec}s]`, time: 'now', state: 'sent' },
        unread: 0
      }
    }))
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="p-4">
  <div className="flex h-[calc(100vh-7rem)] w-full gap-4 lg:h-[calc(100vh-7rem)]">
          {/* Left: Chats list card */}
          <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 w-full pb-0 lg:w-96">
            <div data-slot="card-header" className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
              <div data-slot="card-title" className="font-semibold text-xl lg:text-2xl">Chats</div>
              <div data-slot="card-action" className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9 rounded-full"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="New chat"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>
              <div data-slot="card-description" className="text-muted-foreground text-sm relative col-span-2 mt-4 flex w-full items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 size-4" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                <input className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ps-10" placeholder="Chats search..." type="text" />
              </div>
            </div>

            <div data-slot="card-content" className="flex-1 overflow-auto p-0">
              <div className="block min-w-0 divide-y">
                {conversations.map((c) => (
                  <div
                    key={c.id}
                    className="group/item hover:bg-muted relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4"
                    onClick={() => {
                      setSelectedId(c.id)
                      setConversations(prev => prev.map(cv => cv.id === c.id ? { ...cv, unread: 0, last: { ...cv.last, state: 'read' } } : cv))
                    }}
                  >
                    <span className="relative flex size-8 shrink-0 rounded-full overflow-visible md:size-10">
                      {c.participant.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="aspect-square size-full" alt="avatar image" src={c.participant.avatar} />
                      ) : (
                        <span className="bg-muted flex size-full items-center justify-center rounded-full">{c.participant.initials ?? c.participant.name.split(' ').map(p=>p[0]).slice(0,2).join('')}</span>
                      )}
                      <div className="size-2 absolute rounded-full bg-green-400 right-0.5 bottom-0.5"></div>
                    </span>
                    <div className="min-w-0 grow">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-medium">{c.participant.name}</span>
                        <span className="text-muted-foreground flex-none text-xs">{c.last.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {c.last.state === 'read' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true"><path d="M18 6 7 17l-5-5"></path><path d="m22 10-7.5 7.5L13 16"></path></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                        )}
                        <span className="text-muted-foreground truncate text-start text-sm">{c.last.text}</span>
                        {c.unread > 0 && <div className="ms-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm text-white">{c.unread}</div>}
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 flex items-center px-4 opacity-0 group-hover/item:opacity-100">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon" className="size-9 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => { setViewingProfile({
                            name: c.participant.name,
                            avatar: c.participant.avatar,
                            last_seen: c.last.time,
                            online_status: c.participant.status ?? 'online',
                            about: 'Small business owner passionate about quality products.',
                            phone: '+55 (11) 99999-0000',
                            country: 'Brazil',
                            website: 'https://example.com',
                            social_links: [
                              { name: 'Facebook', url: 'https://facebook.com' },
                              { name: 'Linkedin', url: 'https://linkedin.com' },
                              { name: 'Instagram', url: 'https://instagram.com' },
                              { name: 'X', url: 'https://x.com' },
                            ]
                          }) }}>
                            View Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Functional chat */}
          <div className="grow p-0 lg:pl-6">
            {selected ? (
              <ChatComponent
                participant={selected.participant}
                messages={selected.messages}
                onSend={handleSend}
                onSendAudio={handleSendAudio}
                onStartCall={(type) => setCall({ type, participant: selected.participant })}
                className="h-full"
              />
            ) : null}
          </div>
          <ProfileSheet user={viewingProfile} onOpenChange={(isOpen) => { if (!isOpen) setViewingProfile(null) }} />
        </div>
        <CallDialog
          open={!!call}
          type={call?.type}
          participant={call?.participant}
          onClose={() => setCall(null)}
          onEnd={(summary) => {
            if (!selected) return;
            const time = new Date();
            const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setConversations(prev => prev.map(c => {
              if (c.id !== selected.id) return c;
              const nextMsg: ChatMessage = { id: `m${Date.now()}`, role: 'user', content: summary, timestamp: timeStr, status: 'sent' };
              return { ...c, messages: [...c.messages, nextMsg], last: { text: summary, time: 'now', state: 'sent' } };
            }))
          }}
        />
      </div>
    </main>
  );
}

type CallDialogProps = {
  open: boolean;
  type?: 'audio' | 'video' | 'screen';
  participant?: Participant | null;
  onClose: () => void;
  onEnd: (summary: string) => void;
}

function CallDialog({ open, type, participant, onClose, onEnd }: CallDialogProps) {
  const [running, setRunning] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [camOff, setCamOff] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [seconds, setSeconds] = React.useState(0);
  const streamRef = React.useRef<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!open) {
      cleanup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function cleanup() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
    setMuted(false);
    setCamOff(false);
    setSeconds(0);
    setError(null);
  }

  async function start() {
    try {
      setError(null);
      let stream: MediaStream;
      if (type === 'video') {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } else if (type === 'audio') {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } else {
        // screen
        // Note: some browsers block audio for getDisplayMedia unless explicitly allowed.
        // Keeping it video-only here.
        // @ts-ignore
        stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
      }
      streamRef.current = stream;
      if (videoRef.current && (type === 'video' || type === 'screen')) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setRunning(true);
      timerRef.current = window.setInterval(() => setSeconds(s => s + 1), 1000);
    } catch (e: any) {
      setError(e?.message ?? 'Unable to start media');
    }
  }

  function toggleMute() {
    const tracks = streamRef.current?.getAudioTracks() ?? [];
    const newState = !muted;
    tracks.forEach(t => (t.enabled = !newState));
    setMuted(newState);
  }

  function toggleCam() {
    const tracks = streamRef.current?.getVideoTracks() ?? [];
    const newState = !camOff;
    tracks.forEach(t => (t.enabled = !newState));
    setCamOff(newState);
  }

  function endCall() {
    const dur = seconds;
    cleanup();
    onClose();
    const label = type === 'video' ? 'video call' : type === 'audio' ? 'voice call' : 'screen share';
    onEnd(`[${label} • ${formatDuration(dur)}]`);
  }

  const title = type === 'video' ? 'Video call' : type === 'audio' ? 'Voice call' : 'Screen share';

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { cleanup(); onClose(); } }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} with {participant?.name}</DialogTitle>
          <DialogDescription>
            {running ? 'Connected' : 'Prepare your devices and start the session.'} {seconds > 0 ? `• ${formatDuration(seconds)}` : ''}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          {error && <div className="mb-3 rounded-md border bg-red-50 p-2 text-sm text-red-700">{error}</div>}
          {(type === 'video' || type === 'screen') ? (
            <div className="relative overflow-hidden rounded-lg border">
              <video ref={videoRef} className="h-64 w-full bg-black" muted playsInline />
              {camOff && type === 'video' && (
                <div className="absolute inset-0 grid place-items-center text-muted-foreground">Camera off</div>
              )}
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">Voice call in progress…</div>
          )}
        </div>
        <DialogFooter>
          {!running ? (
            <>
              <Button variant="outline" onClick={() => { cleanup(); onClose(); }}>Cancel</Button>
              <Button onClick={start}>Start</Button>
            </>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                {(type === 'video' || type === 'audio') && (
                  <Button variant="outline" onClick={toggleMute}>{muted ? <MicOff className="size-4" /> : <Mic className="size-4" />} {muted ? 'Unmute' : 'Mute'}</Button>
                )}
                {type === 'video' && (
                  <Button variant="outline" onClick={toggleCam}>{camOff ? <VideoOff className="size-4" /> : <VideoIcon className="size-4" />} {camOff ? 'Camera on' : 'Camera off'}</Button>
                )}
                {type === 'screen' && (
                  <Button variant="outline" onClick={endCall}><MonitorUp className="size-4" /> Stop share</Button>
                )}
              </div>
              <Button onClick={endCall} className="bg-red-600 hover:bg-red-700 text-white"><PhoneOff className="mr-2 size-4" /> End</Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function formatDuration(total: number) {
  const m = Math.floor(total / 60).toString().padStart(2, '0');
  const s = Math.floor(total % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
