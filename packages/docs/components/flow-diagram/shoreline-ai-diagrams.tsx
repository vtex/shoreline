import { FlowDiagram } from './flow-diagram'

export function ShorelineAIArchitectureDiagram() {
  return (
    <FlowDiagram
      title="Your backend feeds your stream transport. The runtime passes it to AIProvider, which serves the hooks, the components, the debug panel and onRunError. An internal bridge translates messages for the chat engine."
      width={800}
      height={330}
      nodes={[
        {
          id: 'backend',
          x: 10,
          y: 110,
          width: 120,
          height: 56,
          title: 'Your backend',
        },
        {
          id: 'transport',
          x: 170,
          y: 110,
          width: 150,
          height: 56,
          title: 'StreamTransport',
          sub: 'you write this, once',
          tone: 'yours',
        },
        {
          id: 'runtime',
          x: 390,
          y: 110,
          width: 150,
          height: 56,
          title: 'Runtime',
          sub: 'builder + useRuntime',
        },
        {
          id: 'provider',
          x: 590,
          y: 110,
          width: 160,
          height: 56,
          title: '<AIProvider>',
          sub: 'shares the runtime',
          tone: 'accent',
        },
        {
          id: 'watchers',
          x: 590,
          y: 10,
          width: 160,
          height: 56,
          title: 'Debug panel',
          sub: 'and onRunError',
        },
        {
          id: 'bridge',
          x: 390,
          y: 250,
          width: 150,
          height: 56,
          title: 'Bridge',
          sub: 'internal',
        },
        {
          id: 'components',
          x: 570,
          y: 250,
          width: 120,
          height: 56,
          title: 'Components',
          sub: 'AIThread, ...',
        },
        {
          id: 'hooks',
          x: 710,
          y: 250,
          width: 80,
          height: 56,
          title: 'Hooks',
          sub: 'useAI*',
        },
      ]}
      edges={[
        { from: 'backend', to: 'transport' },
        { from: 'transport', to: 'runtime', label: 'snapshots' },
        { from: 'runtime', to: 'provider' },
        {
          from: 'runtime',
          to: 'bridge',
          dashed: true,
          fromSide: 'bottom',
          toSide: 'top',
          label: 'translates',
        },
        { from: 'provider', to: 'watchers', dashed: true, label: 'watch' },
        {
          from: 'provider',
          to: 'components',
          fromSide: 'bottom',
          toSide: 'top',
        },
        { from: 'provider', to: 'hooks', fromSide: 'bottom', toSide: 'top' },
      ]}
      caption="Orange is yours. The transport is the only part you write."
    />
  )
}

export function ShorelineAIWiringDiagram() {
  return (
    <FlowDiagram
      title="The stream transport and the optional attachment handler go into createRuntimeBuilder. useRuntime turns the result into a runtime for AIProvider. The threads adapter and onRunError are props of AIProvider."
      width={800}
      height={330}
      nodes={[
        {
          id: 'transport',
          x: 10,
          y: 100,
          width: 170,
          height: 56,
          title: 'StreamTransport',
          sub: 'required',
          tone: 'yours',
        },
        {
          id: 'handler',
          x: 10,
          y: 190,
          width: 170,
          height: 56,
          title: 'AttachmentHandler',
          sub: 'optional',
          tone: 'yours',
        },
        {
          id: 'builder',
          x: 240,
          y: 145,
          width: 170,
          height: 56,
          title: 'createRuntimeBuilder()',
          sub: '.transport() .attachments()',
        },
        {
          id: 'useRuntime',
          x: 460,
          y: 145,
          width: 130,
          height: 56,
          title: 'useRuntime',
          sub: 'returns the runtime',
        },
        {
          id: 'provider',
          x: 630,
          y: 145,
          width: 160,
          height: 56,
          title: '<AIProvider>',
          sub: 'runtime={runtime}',
          tone: 'accent',
        },
        {
          id: 'threads',
          x: 630,
          y: 20,
          width: 160,
          height: 56,
          title: 'threads adapter',
          sub: 'list, load, archive',
          tone: 'yours',
        },
        {
          id: 'ui',
          x: 630,
          y: 260,
          width: 160,
          height: 56,
          title: 'Hooks and components',
          sub: 'useAIStatus, AIMessages',
        },
      ]}
      edges={[
        { from: 'transport', to: 'builder' },
        { from: 'handler', to: 'builder' },
        { from: 'builder', to: 'useRuntime' },
        { from: 'useRuntime', to: 'provider' },
        { from: 'threads', to: 'provider', fromSide: 'bottom', toSide: 'top' },
        { from: 'provider', to: 'ui', fromSide: 'bottom', toSide: 'top' },
      ]}
      caption="Orange boxes are the parts you write. Keep the built value and the threads adapter stable between renders."
    />
  )
}

export function ShorelineAIRunStatesDiagram() {
  return (
    <FlowDiagram
      title="Run status: idle, then submitted when the user sends, streaming when the first parts arrive, and ready when the transport returns. A throw or a final status error ends in error."
      width={800}
      height={250}
      nodes={[
        {
          id: 'idle',
          x: 10,
          y: 60,
          width: 120,
          height: 56,
          title: 'idle',
          sub: 'no messages',
        },
        {
          id: 'submitted',
          x: 210,
          y: 60,
          width: 130,
          height: 56,
          title: 'submitted',
          sub: 'no content yet',
          tone: 'accent',
        },
        {
          id: 'streaming',
          x: 420,
          y: 60,
          width: 130,
          height: 56,
          title: 'streaming',
          sub: 'parts arriving',
          tone: 'accent',
        },
        {
          id: 'ready',
          x: 630,
          y: 60,
          width: 130,
          height: 56,
          title: 'ready',
          sub: 'run ended',
          tone: 'ok',
        },
        {
          id: 'error',
          x: 420,
          y: 170,
          width: 130,
          height: 56,
          title: 'error',
          sub: 'onRunError called',
          tone: 'error',
        },
      ]}
      edges={[
        { from: 'idle', to: 'submitted', label: 'send' },
        { from: 'submitted', to: 'streaming', label: 'first parts' },
        { from: 'streaming', to: 'ready', label: 'final' },
        { from: 'streaming', to: 'error', label: 'throw or status error' },
      ]}
      caption="A run that fails before any content goes from submitted to error. A run the user cancels is not an error."
    />
  )
}

export function ShorelineAIDebugFlowDiagram() {
  return (
    <FlowDiagram
      title="The transport sends snapshots to the runtime. The runtime updates the messages and the status. When debugStream is on, a recorder also copies each snapshot, and the debug panel lists the copies."
      width={800}
      height={270}
      nodes={[
        {
          id: 'transport',
          x: 10,
          y: 105,
          width: 150,
          height: 56,
          title: 'StreamTransport',
          sub: 'yield / return',
          tone: 'yours',
        },
        {
          id: 'runtime',
          x: 240,
          y: 105,
          width: 130,
          height: 56,
          title: 'Runtime',
        },
        {
          id: 'chat',
          x: 440,
          y: 20,
          width: 170,
          height: 56,
          title: 'Messages and status',
          sub: 'what the user sees',
        },
        {
          id: 'recorder',
          x: 410,
          y: 190,
          width: 170,
          height: 56,
          title: 'Recorder',
          sub: 'copies each snapshot',
        },
        {
          id: 'panel',
          x: 630,
          y: 190,
          width: 165,
          height: 56,
          title: 'AIStreamDebugPanel',
          sub: 'a row per snapshot',
          tone: 'accent',
        },
      ]}
      edges={[
        { from: 'transport', to: 'runtime', label: 'snapshots' },
        { from: 'runtime', to: 'chat' },
        { from: 'runtime', to: 'recorder', dashed: true, label: 'debugStream' },
        { from: 'recorder', to: 'panel' },
      ]}
      caption="The dashed path exists only when debugStream is on. Your transport does not change."
    />
  )
}
