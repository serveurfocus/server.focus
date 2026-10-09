# Studio Focus Art – version avec sauvegarde serveur

Contenu : `index.html` (l'application) + `functions/api/db.js` (le serveur, Cloudflare Pages Functions + KV).

## Mise en ligne (une seule fois)

1. Créez un espace de stockage : Cloudflare → Workers & Pages → **KV** → *Create a namespace* → nom : `studio-focus-art`.
2. Déployez ce dossier **avec les fonctions** (le glisser-déposer du tableau de bord ne les prend pas en charge). Deux options :
   - **Terminal** : `npx wrangler pages deploy . --project-name studio-focus-art`
   - **GitHub** : mettez ces fichiers dans un dépôt, puis Workers & Pages → Create → Pages → *Connect to Git* (aucune commande de build, dossier de sortie : `/`).
3. Dans le projet Pages → **Settings → Bindings** → *Add* → **KV namespace** : nom de variable `DB`, namespace `studio-focus-art`.
4. **Settings → Variables and Secrets** → ajoutez un secret nommé `PASSWORD` avec votre mot de passe.
5. Redéployez une fois (Deployments → Retry deployment, ou relancez la commande).

Ouvrez ensuite votre adresse `.pages.dev` : l'application demande le mot de passe, puis enregistre chaque modification sur le serveur. Vous retrouvez les mêmes données sur téléphone et ordinateur.

Pour importer vos anciennes données : Paramètres → Importer (fichier JSON exporté depuis l'ancienne version).
