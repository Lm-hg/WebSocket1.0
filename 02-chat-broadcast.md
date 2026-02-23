# Exercice 2 - Chat broadcast multi-clients

## Objectif
Transformer l'echo en un chat qui broadcast a tous les clients connectes.

## Walkthrough
1. Modifier le handler `'message'` : au lieu de repondre uniquement a l'emetteur, iterer sur `wss.clients`.
2. Envoyer le message a tous les clients connectes (y compris ou sauf l'emetteur, au choix).
3. Ajouter un systeme de nickname : le premier message envoye par un client devient son pseudo.
4. Stocker le pseudo sur l'objet socket : `(ws as any).nickname = firstMessage`.
5. Formater les messages : `"Alice: Hello!"`.
6. Annoncer les arrivees (`"Alice a rejoint le chat"`) et les departs (`"Alice a quitte le chat"`).
7. Tester avec 2-3 onglets navigateur ouverts simultanement.

## Checkpoints
- 3 onglets ouverts, chacun recoit les messages des autres.
- Les arrivees et departs sont annonces a tous.
- Le pseudo est affiche devant chaque message.

## Aide
- `wss.clients` est un `Set<WebSocket>`, utiliser `.forEach()`.
- Toujours verifier `client.readyState === WebSocket.OPEN` avant d'envoyer.
- Pour exclure l'emetteur : `if (client !== ws && client.readyState === WebSocket.OPEN)`.
