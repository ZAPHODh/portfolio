---
title: "Snap Component"
description: "CLI para gerar componentes React com suporte a estilos, testes e Storybook."
date: "2025-07-29"
technologies: ["Node.js", "React", "TypeScript", "Styled-components", "Jest", "Storybook"]
---

## Aviso

Este pacote está em desenvolvimento e pode conter erros ou comportamentos inesperados. Use com cautela.

---

# Snap Component

**Snap Component** é uma ferramenta de linha de comando (CLI) para gerar rapidamente a estrutura de um componente React completo, com suporte a:

- Estilização via \`styled-components\` ou CSS  
- Testes unitários com \`Jest\`  
- Arquivos de Storybook  
- Tipagem com TypeScript ou JavaScript  

O objetivo é **aumentar a produtividade** e **padronizar a criação de componentes** em projetos React.

---

## Instalação

\`\`\`bash
npm i -D snap-component
# ou
pnpm i -D snap-component
\`\`\`

---

## Requisitos

Antes de usar o Snap Component, crie o arquivo \`snap-component.config.json\` na raiz do projeto:

\`\`\`json
{
  "language": "ts",
  "outputDir": "src/components",
  "cssFramework": "styled-components",
  "test": "jest",
  "useStorybook": true
}
\`\`\`

### Configurações disponíveis

| Campo          | Descrição                                                                 |
|----------------|---------------------------------------------------------------------------|
| \`language\`     | Linguagem a ser usada (\`ts\` ou \`js\`)                                      |
| \`outputDir\`    | Caminho de saída para os componentes (padrão: \`src/components\`)           |
| \`cssFramework\` | Framework de estilo: \`styled-components\` ou \`css\`                         |
| \`test\`         | Framework de testes (atualmente apenas \`jest\` suportado)                  |
| \`useStorybook\` | Se deve gerar arquivos \`.stories.tsx\` para Storybook (\`true\` ou \`false\`)  |

---

## Uso

Adicione um script no seu \`package.json\`:

\`\`\`json
{
  "scripts": {
    "snap-component": "snap-component snap-component"
  }
}
\`\`\`

### Com npm:

\`\`\`bash
npm run snap-component NomeDoComponente
\`\`\`

### Com pnpm:

\`\`\`bash
pnpm snap-component NomeDoComponente
\`\`\`

---

## Estrutura Gerada

\`\`\`
src/components/NomeDoComponente/
├── index.tsx           # Componente principal
├── styles.ts           # Estilo com styled-components ou CSS
├── index.test.tsx      # Testes com Jest
├── index.stories.tsx   # (Opcional) Arquivo de Storybook
\`\`\`

---

## Exemplo de Código Gerado

### Componente

\`\`\`tsx
'use client'

import * as Styled from './styles'

export type SnapComponentProps = {
  name: string
}

export const SnapComponent = ({ name }: SnapComponentProps) => {
  return <Styled.Wrapper>{name}</Styled.Wrapper>
}
\`\`\`

### Storybook

\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SnapComponent } from '.'

const meta = {
  title: 'Component/SnapComponent',
  component: SnapComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'description',
    },
  },
} satisfies Meta<typeof SnapComponent>

export default meta

export const Default: StoryObj<typeof meta> = {
  args: { name: 'preset-story' },
}
\`\`\`

### Teste

\`\`\`tsx
import { render } from '@testing-library/react'
import { SnapComponent } from '.'

describe('SnapComponent', () => {
  it('should render the SnapComponent', () => {
    const { getByText } = render(<SnapComponent name="test" />)
    expect(getByText('test')).toBeInTheDocument()
  })
})
\`\`\`

---

## Componentes Pré-configurados

O comando também pode gerar estruturas específicas como \`heading\`, \`tooltip\`, etc., com props e testes personalizados.

\`\`\`bash
pnpm snap-component heading
\`\`\`

---

## Contribuições

Contribuições são bem-vindas! Faça um fork do repositório, crie uma branch e envie um pull request. Toda ajuda é bem-vinda!

[https://github.com/ZAPHODh/snap-component](https://github.com/ZAPHODh/snap-component)