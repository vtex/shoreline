import { useState } from 'react'
import {
  AIMessageAction,
  AIMessageActions,
  AIMessageAssistant,
  AIMessageCopy,
  AIMessageDate,
  AIMessageParts,
  AIMessageUser,
  AIMessages,
  useAIMessage,
} from '@vtex/shoreline-ai'
import {
  AIDemoMessages,
  AIDemoProvider,
  demoConversation,
} from '../components/ai-demo'

// The thumbs belong to the app. The package ships the bar and the button,
// not the icons or the feedback behavior.
function ThumbIcon(props: { down?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={props.down ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path d="M6 9v8H3.5V9H6zm0 0 3-6c1.4 0 2 .9 2 2v3h4.4c.9 0 1.5.8 1.3 1.6l-1 5c-.2.8-.8 1.4-1.6 1.4H6" />
    </svg>
  )
}

type Vote = 'up' | 'down'

// One pair of thumbs per answer: the vote is keyed by the message id.
function Thumbs(props: {
  votes: Record<string, Vote>
  onVote: (messageId: string, vote: Vote | null) => void
}) {
  const { votes, onVote } = props
  const { id } = useAIMessage()
  const vote = votes[id]

  return (
    <>
      <AIMessageAction
        label="Good response"
        aria-pressed={vote === 'up'}
        onClick={() => onVote(id, vote === 'up' ? null : 'up')}
      >
        <ThumbIcon />
      </AIMessageAction>
      <AIMessageAction
        label="Bad response"
        aria-pressed={vote === 'down'}
        onClick={() => onVote(id, vote === 'down' ? null : 'down')}
      >
        <ThumbIcon down />
      </AIMessageAction>
    </>
  )
}

export default function Example() {
  const [votes, setVotes] = useState<Record<string, Vote>>({})

  function handleVote(messageId: string, vote: Vote | null) {
    setVotes((current) => {
      const next = { ...current }

      if (vote) next[messageId] = vote
      else delete next[messageId]

      return next
    })
  }

  return (
    <AIDemoProvider>
      <AIDemoMessages messages={demoConversation}>
        <AIMessages>
          <AIMessageUser />
          <AIMessageAssistant>
            <AIMessageParts />
            {/* With children, the bar renders exactly what you pass */}
            <AIMessageActions>
              <Thumbs votes={votes} onVote={handleVote} />
              <AIMessageCopy />
              <AIMessageDate />
            </AIMessageActions>
          </AIMessageAssistant>
        </AIMessages>
      </AIDemoMessages>
    </AIDemoProvider>
  )
}
