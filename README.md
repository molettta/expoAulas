# Operação Campo — projeto de referência

Tecnologias Móveis e Híbridas — SENAC.
Este repositório guarda o app **no estado exato do fim de cada aula**.

> **Este repositório é para voltar ao ponto, não para partir dele.**
> Ele é da **variante B (Campo)**, com o exemplo de vistoria do material.
> Quem clonar e entregar "Bomba 03" copiou em vez de adaptar.
> O projeto do seu grupo é o seu, com a entidade da sua variante.

## As etiquetas

O fim de uma aula **é** o começo da seguinte — por isso o mesmo ponto leva duas etiquetas.

| Etiqueta | O que é |
|---|---|
| `aula-11-inicio` | Projeto recém-criado, antes de qualquer código nosso |
| `aula-11-fim` / `aula-12-inicio` | Fim de 31/08: entidade tipada e a primeira lista |
| `aula-12-fim` / `aula-13-inicio` | Fim de 04/09: card, FlatList, tema e acessibilidade |

## Quebrei tudo, quero recomeçar de onde a aula de hoje começa

```bash
git fetch --tags
git checkout -B minha-aula-12 aula-12-inicio
```

O `-B` cria um ramo naquele ponto. **Não** vá direto para a etiqueta
(`git checkout aula-12-inicio`): isso deixa você em *detached HEAD*, e o commit
que fizer no fim da aula não gruda em lugar nenhum — o trabalho do dia some.

## Rodar

```bash
npm install
npx expo start --tunnel
```

Sem aparelho? `npx expo start --web` — na primeira vez ele pede para instalar
`react-dom`, `react-native-web` e `@expo/metro-runtime`. Aceite.

## Ambiente validado

Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript 6.0
