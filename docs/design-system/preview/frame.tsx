import type React from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Button,
  IconButton,
  IconPlus,
  IconArrowUp,
  IconX,
  IconChatCircle,
  VisuallyHidden,
} from '../../../packages/shoreline/src'
import './frame.css'

const params = new URLSearchParams(location.search)
const horizon = params.get('theme') === 'horizon'
const icons = params.get('component') === 'icon-button'
await (horizon
  ? import('../../../packages/shoreline/dist/themes/horizon/styles.css')
  : import('../../../packages/shoreline/dist/themes/sunrise/styles.css'))

function Row({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="specimen-row">
      <span className="row-label">{label}</span>
      <div className="example">{children}</div>
    </div>
  )
}
function Missing({ children }: { children: React.ReactNode }) {
  return <span className="missing">{children}</span>
}
function Comparison() {
  const [actions, setActions] = useState(0)
  const activate = () => setActions((value) => value + 1)
  return (
    <div className="specimens">
      {icons ? (
        <>
          <Row label="Adicionar">
            <IconButton
              label="Adicionar"
              variant="secondary"
              onClick={activate}
            >
              <IconPlus />
            </IconButton>
          </Row>
          <Row label="Enviar">
            <IconButton
              label="Enviar"
              variant="primary"
              shape={horizon ? 'rounded' : 'default'}
              onClick={activate}
            >
              <IconArrowUp />
            </IconButton>
          </Row>
          <Row label="Fechar">
            <IconButton
              label="Fechar"
              variant="tertiary"
              shape={horizon ? 'rounded' : 'default'}
              onClick={activate}
            >
              <IconX />
            </IconButton>
          </Row>
          <Row label="Compacto">
            {horizon ? (
              <IconButton
                label="Abrir chat"
                variant="outline"
                size="small"
                onClick={activate}
              >
                <IconChatCircle />
              </IconButton>
            ) : (
              <Missing>
                Sem tamanho small
                <br />
                na API anterior
              </Missing>
            )}
          </Row>
          <Row label="Desabilitado">
            <IconButton
              label="Enviar desabilitado"
              variant="primary"
              shape={horizon ? 'rounded' : 'default'}
              disabled
            >
              <IconArrowUp />
            </IconButton>
          </Row>
          <Row label="Carregando">
            <IconButton
              label="Enviando"
              variant="primary"
              shape={horizon ? 'rounded' : 'default'}
              loading
            >
              <IconArrowUp />
            </IconButton>
          </Row>
        </>
      ) : (
        <>
          <Row label="Primário">
            <Button variant="primary" onClick={activate}>
              Approve &amp; continue
            </Button>
          </Row>
          <Row label="Secundário">
            <Button variant="secondary" onClick={activate}>
              Cancelar
            </Button>
          </Row>
          <Row label="Terciário">
            <Button variant="tertiary" onClick={activate}>
              Ver detalhes
            </Button>
          </Row>
          <Row label="Arredondado">
            {horizon ? (
              <Button variant="primary" shape="rounded" onClick={activate}>
                <IconPlus />
                Criar tarefa
              </Button>
            ) : (
              <Missing>
                Sem shape="rounded"
                <br />
                na API anterior
              </Missing>
            )}
          </Row>
          <Row label="Contorno">
            {horizon ? (
              <Button variant="outline" size="small" onClick={activate}>
                <IconChatCircle />
                Open chat
              </Button>
            ) : (
              <Missing>
                Sem variante outline
                <br />
                na API anterior
              </Missing>
            )}
          </Row>
          <Row label="Sucesso">
            {horizon ? (
              <Button variant="success" onClick={activate}>
                Declare Active
              </Button>
            ) : (
              <Missing>
                Sem variante success
                <br />
                na API anterior
              </Missing>
            )}
          </Row>
        </>
      )}
      <VisuallyHidden>
        <output aria-live="polite">{actions} ações executadas</output>
      </VisuallyHidden>
    </div>
  )
}
const root = document.getElementById('root')
if (root) createRoot(root).render(<Comparison />)
