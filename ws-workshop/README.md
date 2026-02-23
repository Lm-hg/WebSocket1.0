# ws-workshop

Mini projet TypeScript + Node.js avec WebSocket.

## Prerequis

- Node.js 18+ recommande
- npm

## Installation

```bash
cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/server
npm install
```

## Lancer le serveur (Exercice 0/1/2)

```bash
cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/server
npm run dev
```

Le serveur ecoute sur `ws://localhost:8080`.

## Tester dans le navigateur (Exercice 1 et 2)

1. Ouvrir le fichier `/Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/client/index.html` dans le navigateur.
2. Ouvrir la console du navigateur.
3. Envoyer d'abord un pseudo (premier message) :

```js
ws.send("Alice")
```

4. Envoyer ensuite des messages de chat :

```js
ws.send("Bonjour a tous")
```

## Test multi-clients (Exercice 2)

1. Ouvrir 2 ou 3 onglets avec le meme `index.html`.
2. Dans chaque onglet, definir un pseudo differente (`Alice`, `Gilbert`, `Anna`).
3. Envoyer des messages dans chaque onglet.
4. Verifier que :
- tous les onglets recoivent les messages,
- les entrees/sorties sont annoncees,
- les messages sont prefixes par le pseudo (`Alice: ...`).

