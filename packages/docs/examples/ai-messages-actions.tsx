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
  ThumbIcon,
  demoConversation,
} from '../components/ai-demo'

// The thumbs belong to the app (these are the proposal's icons). The package
// ships the bar and the button, not the icons or the feedback behavior.
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
        <ThumbIcon direction="up" selected={vote === 'up'} />
      </AIMessageAction>
      <AIMessageAction
        label="Bad response"
        aria-pressed={vote === 'down'}
        onClick={() => onVote(id, vote === 'down' ? null : 'down')}
      >
        <ThumbIcon direction="down" selected={vote === 'down'} />
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
