# ws-workshop

Projet WebSocket avec serveur Node.js + frontend React.

## Prerequis

- Node.js 18+ recommande
- npm

## Installation

```bash
cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/server
npm install

cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/client
npm install
```

## Lancer le projet

Terminal 1 (serveur WebSocket) :

```bash
cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/server
npm run dev
```

Terminal 2 (frontend React) :

```bash
cd /Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/client
npm run dev
```

Puis ouvrir l'URL affichee par Vite (souvent `http://localhost:5173`).

## Utilisation

1. Saisir un pseudo puis cliquer sur `Valider`.
2. Ecrire un message puis cliquer sur `Envoyer`.
3. Ouvrir 2 ou 3 onglets pour simuler plusieurs utilisateurs.

## Protocole (Exercice 3)

- Types partages: `/Users/pharosi/Dev/GitHub/Hetic/WebSocket1.0/ws-workshop/shared/types.ts`
- Le client envoie du JSON:
  - `{ "type": "set-nick", "nick": "Alice" }`
  - `{ "type": "chat", "text": "Bonjour" }`
  - `{ "type": "typing" }`
- Le serveur repond en JSON avec:
  - `chat`
  - `system`
  - `user-list`
  - `typing`

## Verification rapide

- Chaque onglet recoit les messages envoyes par les autres.
- Les arrivees et departs sont annonces dans le flux.
- Les messages sont prefixes par le pseudo (`Alice: Bonjour`).
