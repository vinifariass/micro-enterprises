"use client";

import * as React from "react";
import { Check, CheckCheck, MonitorUp, MoreVertical, Phone, Search, Send, Smile, Video, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type ChatMessage = {
	id: string
	role: 'agent' | 'user'
	content: string
	timestamp: string // e.g., "05:23 PM"
	status: 'sent' | 'delivered' | 'read'
	// Future-ready fields
	kind?: 'text' | 'audio'
	audioUrl?: string
	audioDurationSec?: number
}

export type Participant = {
	name: string;
	avatar?: string;
	initials?: string;
	status?: "online" | "offline";
};

type Props = {
	className?: string;
	participant: Participant;
	messages: ChatMessage[];
	onSend: (text: string) => void;
	onSendAudio?: (audio: { url: string; blob: Blob; durationSec: number }) => void;
	onStartCall?: (type: 'audio' | 'video' | 'screen') => void;
};

export function ChatComponent({ className, participant, messages, onSend, onSendAudio, onStartCall }: Props) {
	const [inputValue, setInputValue] = React.useState("");
	const [isRecording, setIsRecording] = React.useState(false);
	const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
	const recordChunksRef = React.useRef<BlobPart[]>([]);
	const recordStartAtRef = React.useRef<number>(0);

	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mr = new MediaRecorder(stream);
			recordChunksRef.current = [];
			recordStartAtRef.current = Date.now();
			mr.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) recordChunksRef.current.push(e.data);
			};
			mr.onstop = async () => {
				const durationSec = Math.max(1, Math.round((Date.now() - recordStartAtRef.current) / 1000));
				const blob = new Blob(recordChunksRef.current, { type: 'audio/webm' });
				const url = URL.createObjectURL(blob);
				if (onSendAudio) onSendAudio({ url, blob, durationSec });
				else onSend(`[audio message • ${durationSec}s]`);
				// Stop all tracks to release mic
				stream.getTracks().forEach(t => t.stop());
			};
			mediaRecorderRef.current = mr;
			mr.start();
			setIsRecording(true);
		} catch (err) {
			console.error('Mic permission / recording failed', err);
			setIsRecording(false);
		}
	}

	function stopRecording() {
		try {
			mediaRecorderRef.current?.stop();
		} catch {}
		setIsRecording(false);
	}

		return (
			<div className={cn("flex h-full flex-col rounded-xl border bg-background", className)}>
				{/* Header */}
				<div className="flex items-center gap-3 border-b px-4 py-3">
					<Avatar>
						{participant.avatar ? (
							<AvatarImage src={participant.avatar} alt="avatar" />
						) : (
							<AvatarFallback>{participant.initials ?? participant.name.split(" ").map(p=>p[0]).slice(0,2).join("")}</AvatarFallback>
						)}
					</Avatar>
					<div className="leading-tight">
						<div className="font-medium">{participant.name}</div>
						<div className="text-xs text-green-600">{participant.status === "offline" ? "Offline" : "Online"}</div>
					</div>
					<div className="ms-auto flex items-center gap-1">
									<Button variant="outline" size="icon" aria-label="Video call" onClick={() => onStartCall?.('video')}><Video className="size-4" /></Button>
									<Button variant="outline" size="icon" aria-label="Voice call" onClick={() => onStartCall?.('audio')}><Phone className="size-4" /></Button>
									<Button variant="outline" size="icon" aria-label="Share screen" onClick={() => onStartCall?.('screen')}><MonitorUp className="size-4" /></Button>
						<Button variant="outline" size="icon" aria-label="Search"><Search className="size-4" /></Button>
						<Button variant="outline" size="icon" aria-label="More"><MoreVertical className="size-4" /></Button>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-auto p-4">
					<div className="mx-auto max-w-3xl space-y-3">
						{messages.map((message) => (
							<div key={message.id} className={cn('message-container', `message-container--${message.role}`)}>
								<div className="message-bubble-wrapper">
												<div className={cn('message-bubble', `message-bubble--${message.role}`)}>
													{message.kind === 'audio' && message.audioUrl ? (
														<div className="flex items-center gap-3">
															<audio src={message.audioUrl} controls className="max-w-[240px]" />
															{message.audioDurationSec ? (
																<span className="text-xs opacity-70">{message.audioDurationSec}s</span>
															) : null}
														</div>
													) : (
														message.content
													)}
												</div>
									<button className="message-options-btn" aria-label="More options">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis" aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
									</button>
								</div>

								{message.role === 'user' && (
									<div className="message-meta">
										<time className="message-timestamp">{message.timestamp}</time>
										{message.status === 'sent' && <Check className="message-status-icon" />}
										{message.status === 'delivered' && <CheckCheck className="message-status-icon" />}
										{message.status === 'read' && <CheckCheck className={cn('message-status-icon','message-status-icon--read')} />}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Composer */}
				<div className="border-t p-3">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const text = inputValue.trim();
							if (!text) return;
							onSend(text);
							setInputValue("");
						}}
						className="mx-auto flex max-w-3xl items-center gap-2"
					>
						<Button variant="outline" size="icon" aria-label="Emoji"><Smile className="size-4" /></Button>
									{isRecording ? (
										<Button type="button" variant="outline" size="icon" aria-label="Stop recording" onClick={stopRecording}>
											<Square className="size-4" />
										</Button>
									) : (
										<Button type="button" variant="outline" size="icon" aria-label="Record audio" onClick={startRecording}>
											<Mic className="size-4" />
										</Button>
									)}
						<input
							placeholder="Enter message..."
							className="flex-1 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
							value={inputValue}
							onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
						/>
						<Button className="h-9 px-4" type="submit"><Send className="mr-2 size-4" />Send</Button>
					</form>
				</div>
			</div>
		);
}
