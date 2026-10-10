# Wonda — Navegação Costeira · São Luís, MA

Protótipo acadêmico de navegação costeira: mapa real de São Luís, pontos de interesse,
registro de perigos, desenho de rotas e monitoramento de marés (simulado).

## Instalar e rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
```

Requer Node 18+ e acesso à internet para os tiles do OpenStreetMap.

## O que funciona localmente

- Mapa real (OpenStreetMap) centrado em São Luís [-2.53, -44.30], pan/zoom, atribuição visível.
- Layout mobile fiel às referências: hambúrguer (sup-esq), 3 ações rápidas (dir),
  maré (inf-esq), marcadores (inf-dir), painel de velocidade (base).
- Pontos de interesse: criar (toque no mapa), editar, excluir, persistem em LocalStorage.
- Perigos: mesmo fluxo, estilo visual próprio (vermelho/âmbar), com severidade.
- Rotas: editor por waypoints, distância geométrica (Haversine, km + nm),
  salvar/listar/ver/excluir, persistem localmente.
- Marés: gráfico SVG 24h, estação aproximada, unidade (m).
- Idiomas PT-BR (padrão) / EN com troca instantânea.
- Camadas lig/desl (pontos, perigos, rotas), GPS opcional via navegador,
  perfil fictício, votos de comunidade (locais), "Salvo neste dispositivo".
- Responsivo: mobile (alvo), tablet e desktop (painel lateral).

## O que é simulado (demonstração)

- **Velocidade**: exibe `—` até GPS real ou badge `simulado` se o modo demo estiver ligado.
- **Marés**: amostra senoidal local — banner "Dados simulados — demonstração acadêmica apenas."
- **Seeds**: 2 pontos + 1 perigo fictícios marcados `demo`; nunca apresentados como reais.
- **Rotas**: distância GEOMÉTRICA (linha reta), nunca navegável; aviso explícito na UI.
- **Perfil/comunidade/sync**: fictícios e locais; sem backend, sem contas, sem rede.

## Fontes externas verificadas

- Cartografia: © OpenStreetMap contributors (`tile.openstreetmap.org`).
- Nenhuma fonte oficial de marés/perigos foi usada — por isso os dados são simulados.

## Limites conhecidos

- Sem backend: tudo em LocalStorage, por navegador/dispositivo.
- `noUnusedLocals` ativo: manter imports usados.
- Bundle ~332 kB (Leaflet incluso); sem code-splitting por simplicidade.
- Tiles exigem internet; sem eles o mapa fica cinza (fora de escopo offline).
