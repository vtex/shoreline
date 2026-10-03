"""Generate the RFC's illustrative SVG figures and standalone HTML previews.

Run from any working directory with Python 3. Uses no external dependencies.
These are editorial diagrams, not production components or browser evidence.
"""

from html import escape
from pathlib import Path

OUT = Path(__file__).resolve().parent
INK = '#0a1524'
SOFT = '#506077'
BLUE = '#1e4ee5'
BLUE_HOVER = '#0131c5'
RED = '#d31a15'
RED_HOVER = '#b40202'


def text(x, y, value, size=22, fill=INK, weight=400, anchor='start', family=None):
    ff = f' font-family="{family}"' if family else ''
    return f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}"{ff}>{escape(value)}</text>'


def rect(x, y, width, height, fill, radius=12, stroke=None, stroke_width=1):
    border = f' stroke="{stroke}" stroke-width="{stroke_width}"' if stroke else ''
    return f'<rect x="{x}" y="{y}" width="{width}" height="{height}" rx="{radius}" fill="{fill}"{border}/>'


def line(x1, y1, x2, y2, fill='#e0e5ef', width=1):
    return f'<path d="M {x1} {y1} H {x2}" stroke="{fill}" stroke-width="{width}"/>' if y1 == y2 else f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{fill}" stroke-width="{width}"/>'


def button(x, y, label='Continuar', variant='primary', state='default', width=160, scale=1.5, size='normal'):
    """Amplify the current 14px type, 12px radius and 36/44px heights for print."""
    h = (36 if size == 'normal' else 44) * scale
    radius = 12 * scale
    fg = '#ffffff' if variant in ('primary', 'critical') else '#212d3f'
    bg = dict(primary=BLUE, critical=RED, secondary='rgba(10,21,36,.05)', tertiary='transparent')[variant]
    if state in ('hover', 'focus'):
        if variant == 'primary' and state == 'hover':
            bg = BLUE_HOVER
        elif variant == 'critical':
            bg = RED_HOVER
        elif variant == 'secondary':
            bg, fg = 'rgba(10,21,36,.10)', INK
        elif variant == 'tertiary':
            bg, fg = 'rgba(10,21,36,.05)', INK
    if state in ('disabled', 'loading'):
        if variant in ('primary', 'critical'):
            bg = '#7f8c9e'
        else:
            bg = 'rgba(4,14,27,.05)' if variant == 'secondary' else 'transparent'
            fg = '#506077' if state == 'loading' else '#b7c3d2'
    out = []
    if state == 'focus':
        ring = dict(primary='#79bcfb', critical='#ff9e8b', secondary='#b7c3d2', tertiary='#b7c3d2')[variant]
        out.append(rect(x - 3*scale, y - 3*scale, width+6*scale, h+6*scale, ring, radius+3*scale))
        out.append(rect(x - scale, y - scale, width+2*scale, h+2*scale, '#ffffff', radius+scale))
    out.append(rect(x, y, width, h, bg, radius))
    if state == 'loading':
        cx, cy, r = x + width/2, y + h/2, 8*scale
        out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" stroke="{fg}" opacity=".25" stroke-width="{2*scale}" fill="none"/>')
        out.append(f'<path d="M{cx} {cy-r} A{r} {r} 0 0 1 {cx+r} {cy}" stroke="{fg}" stroke-width="{2*scale}" stroke-linecap="round" fill="none"/>')
    else:
        out.append(text(x+width/2, y+h/2+5*scale, label, 14*scale, fg, 600, 'middle'))
    return '\n'.join(out)


def start(title, description, height=704):
    return [f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}" role="img" aria-labelledby="title desc">',
            f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>',
            '<g font-family="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif">',
            rect(0, 0, 1200, height, '#ffffff', 0)]


def heading(out, title, subtitle):
    out += [text(40, 44, 'HORIZON / RFC', 19, BLUE, 700),
            rect(852, 21, 308, 34, '#e1f3ff', 17),
            text(1006, 44, 'Proposta para discussão', 19, '#042db4', 600, 'middle'),
            text(40, 101, title, 42, INK, 650),
            text(40, 141, subtitle, 23, SOFT)]


def save(name, out, height):
    svg = '\n'.join(out + ['</g></svg>']) + '\n'
    (OUT / f'{name}.svg').write_text(svg)
    (OUT / f'{name}.html').write_text(f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>RFC Horizon — {name}</title><style>
*{{box-sizing:border-box}}html,body{{margin:0;padding:0;background:#fff}}main{{width:1200px;height:{height}px}}svg{{display:block;width:1200px;height:{height}px}}
</style></head><body><main>{svg}</main></body></html>''')


out = start('Proposta visual de Button Horizon', 'Matriz ilustrativa de quatro variantes e cinco estados. Valores baseados na demonstração local. As imagens não representam aprovação de design ou testes de interação.')
heading(out, 'Button: uma linguagem visual comum', 'Aparência baseada nos tokens atuais da demonstração; estados simulados.')
xs = [252, 434, 616, 798, 980]
for x, label in zip(xs, ['Default', 'Hover', 'Focus', 'Disabled', 'Loading']):
    out.append(text(x+80, 198, label, 22, SOFT, 600, 'middle'))
for row, (variant, label) in enumerate([('primary', 'Continuar'), ('secondary', 'Voltar'), ('tertiary', 'Detalhes'), ('critical', 'Excluir')]):
    y = 228 + row*80
    out.append(text(40, y+33, variant, 23, INK, 600))
    for x, state in zip(xs, ['default', 'hover', 'focus', 'disabled', 'loading']):
        out.append(button(x, y, label, variant, state))
    if row != 3:
        out.append(line(40, y+68, 1160, y+68, '#ecf0f7'))
out += [rect(40, 552, 1120, 76, '#f5f8fc', 16),
        text(62, 585, 'Raio 12 px', 24, INK, 600),
        text(62, 613, '--sl-radius-2', 19, SOFT),
        line(255, 568, 255, 612),
        text(280, 585, 'normal · 36 px', 24, INK, 600),
        text(280, 613, 'large · 44 px', 21, SOFT),
        line(505, 568, 505, 612),
        text(530, 585, 'API compartilhada', 24, INK, 600),
        text(530, 613, 'variant · size · loading · disabled', 21, SOFT),
        text(40, 669, 'Ilustração ampliada 1,5×. Revisão de design e acessibilidade pendentes.', 23, SOFT)]
save('button-proposal', out, 704)

out = start('Button Horizon em três contextos', 'Composições conceituais para AI Workspace, Studio e projetos de template ou protótipo. Todos consomem o mesmo Button Shoreline com o tema Horizon. Não são capturas das aplicações.', 704)
heading(out, 'Um tema, diferentes experiências', 'Mesma API Shoreline em AI Workspace, Studio e projetos dos times de design.')
cards = [(40, 'AI Workspace', 'Criar e executar'), (422, 'Studio', 'Compor e publicar'), (804, 'Templates / protótipos', 'Explorar e validar')]
for x, title, subtitle in cards:
    out += [rect(x, 179, 356, 360, '#f5f8fc', 18, '#e0e5ef'),
            text(x+24, 219, title, 25, INK, 650),
            text(x+24, 252, subtitle, 21, SOFT),
            line(x+24, 273, x+332, 273)]

x = 40
out += [text(x+24, 311, 'O que vamos criar?', 24, INK, 600),
        rect(x+24, 331, 308, 91, '#ffffff', 12, '#ced7e4'),
        text(x+40, 365, 'Uma nova tarefa', 22, SOFT),
        text(x+40, 396, 'para minha equipe…', 22, SOFT),
        button(x+24, 456, 'Criar tarefa', width=171),
        button(x+209, 456, 'Revisar', 'tertiary', width=123)]

x = 422
out += [text(x+24, 311, 'Preparar publicação', 24, INK, 600),
        rect(x+24, 331, 308, 91, '#ffffff', 12, '#ced7e4'),
        rect(x+39, 348, 48, 56, '#e1f3ff', 8),
        line(x+49, 363, x+77, 363, '#97cffe', 5),
        line(x+49, 376, x+72, 376, '#97cffe', 5),
        text(x+103, 366, 'Página inicial', 22, INK, 600),
        text(x+103, 397, 'Rascunho', 21, SOFT),
        button(x+24, 456, 'Publicar', width=149),
        button(x+187, 456, 'Prévia', 'secondary', width=145)]

x = 804
out += [text(x+24, 311, 'Explorar uma direção', 24, INK, 600),
        rect(x+24, 331, 308, 91, '#ffffff', 12, '#ced7e4'),
        text(x+40, 365, 'Novo projeto', 22, INK, 600),
        text(x+40, 397, 'Template de produto', 22, SOFT),
        button(x+24, 456, 'Usar template', width=208)]

out += [rect(40, 560, 1120, 83, '#ecf0f7', 16),
        text(62, 594, "import '@vtex/shoreline/themes/horizon'", 22, '#425269', 400, family='ui-monospace, SFMono-Regular, Consolas, monospace'),
        text(62, 626, '<Button variant="primary">Ação</Button>', 22, '#425269', 400, family='ui-monospace, SFMono-Regular, Consolas, monospace'),
        text(40, 682, 'Composições ilustrativas; não representam telas aprovadas ou integração concluída.', 23, SOFT)]
save('button-contexts', out, 704)

print('Generated button-proposal.svg/.html and button-contexts.svg/.html')
