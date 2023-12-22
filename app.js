document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const characterInfoDiv = document.getElementById("characterInfo");

    searchBtn.addEventListener("click", searchCharacter);

    async function searchCharacter() {
        const searchTerm = searchInput.value.toLowerCase();
        
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
            const data = await response.json();
            const results = data.results;

            displayCharacterResults(results);
        } catch (error) {
            console.error('Error al buscar personajes:', error);
        }
    }

    function displayCharacterResults(results) {
        characterInfoDiv.innerHTML = "";

        if (results.length === 0) {
            characterInfoDiv.textContent = "No se encontraron resultados.";
            return;
        }

        results.forEach(function(character) {
            const characterCard = document.createElement("div");

            const img = document.createElement("img");
            img.src = character.image;

            const idParagraph = document.createElement("p");
            idParagraph.innerHTML = "<strong>ID:</strong> " + character.id;

            const nameParagraph = document.createElement("p");
            nameParagraph.innerHTML = "<strong>Nombre:</strong> " + character.name;

            characterCard.appendChild(img);
            characterCard.appendChild(idParagraph);
            characterCard.appendChild(nameParagraph);

            characterInfoDiv.appendChild(characterCard);
        });
    }
});