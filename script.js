

// Configuration API Airtable
const ACCESS_TOKEN = "pat3cby7Ohs12BA8G.7e930c602225614710e6493d207e2a04f917fa64864ec94a525232a1974d8995"; // Votre jeton d'accès
const BASE_ID = "appTpw3oxtE6dYaNx"; // ID de la base Arabe
const TABLE_PROVERBE = "tblhjVyc8BapNDpNq"; // ID pour Proverbes

// Fonction pour charger les projets récents
async function loadProjects() {
    const url = "https://api.airtable.com/v0/appTpw3oxtE6dYaNx/tblhjVyc8BapNDpNq"; // L'URL complète pour les proverbes
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer pat3cby7Ohs12BA8G.7e930c602225614710e6493d207e2a04f917fa64864ec94a525232a1974d8995`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.querySelector('.proverbe-grid');
        container.innerHTML = ""; // Réinitialiser le contenu

        data.records.forEach((record, index) => {
            const fields = record.fields;
            const projectHTML = `
                <article class="proverbe-item${index + 1}">
                    <h2>${fields.Name || "Catégorie non spécifiée"}</h2>
                    <img src="${fields.Image ? fields.Image[0].url : 'img/default-proverbe.jpg'}" alt="${fields.Titre || "Image indisponible"}" loading="lazy">
                    <audio controls>
                <source src="${fields.Audio ? fields.Audio[0].url : 'audio/default-audio.mp3'}" type="audio/mpeg">
                Votre navigateur ne supporte pas la balise audio.
            </audio>
                </article>
            `;
            container.innerHTML += projectHTML;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Charger les données au démarrage
loadProjects();
loadNews();
