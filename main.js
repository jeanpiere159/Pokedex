const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img ]");
const pokeId = document.querySelector("[data-poke-id]");
const poketypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
    electric: "#FFEA70",
    normal: "#B09398",
    fire: "#FF675C",
    water: "#0596C7",
    grass: "#55B680",
    rock: "#a38c21",
    ground: "#f4a261",
    fairy: "#FFC0DD",
    poison: "#7953A4",
    bug: "#A2FAA3",
    dragon: "#97B3E6",
    psychic: "#FF77CB",
    flying: "#A890F0",
    fighting: "#C03028",
    ghost: "#735797",
    ice: "#96D9D6",
    steel: "#B7B7CE",
    dark: "#705746",
    rock: "#B6A136",
    poison: "#A33EA1",
    default: "#2A1A1F",
}

const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemon(response));
};

const renderPokemon = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute("src", sprite);
    pokeId.textContent = `N#${data.id}`;
    renderPokemonTypes(types);
     setCardColor(types);
    renderPokemonStats(stats);
}

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = `radial-gradient( ${colorOne} 33%, ${colorTwo} 33%)`;
  pokeImg.style.backgroundSize = "5px 5px";
  pokeImg.style.borderRadius = "50%";
};


const renderPokemonTypes = types => {
    poketypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        poketypes.appendChild(typeTextElement);
    })
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const stastElementName = document.createElement("div");
        const stastElementAmount = document.createElement("div");
        stastElementName.textContent = stat.stat.name;
        stastElementAmount.textContent = stat.base_stat;
        statElement.appendChild(stastElementName);
        statElement.appendChild(stastElementAmount);
        pokeStats.appendChild(statElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = "Not Found";
    pokeImg.setAttribute("src", "poke-shadow.png");
    pokeImg.style.background = "#fff";
    pokeId.textContent = "";
    poketypes.innerHTML = "";
    pokeStats.innerHTML = "";
}