import type { Metadata } from 'next'
import ChatView from './view'

export const metadata: Metadata = {
  title: 'Chat',
}

export default function Page() {
  return <ChatView />
}
