console.log("works!")

const pokemonid = location.search.split("=")[1]

const img = document.getElementById("hello")
img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonid}.png`

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Function to fetch Pokemon data
const fetchPokemonData = async () => {
  const response = await fetch(apiUrl + pokemonid);
  const data = await response.json(); // Henter data fra API
  const types = data.types.map(item => item.type.name) // finner riktig data
  const weight = data.weight
  const height = data.height
  const name = data.name

  const stats = data.stats.map(item => ({ value: item.base_stat, name: item.stat.name }))

  return { types, weight, height, name, stats }; // returnerer data
}

const start = async () => {
  const { types, weight, height, name, stats } = await fetchPokemonData()
  console.log({ types, weight, height, name, stats })

  const text_types = document.getElementById("pokemontypes")
  text_types.innerHTML = "type: " + types.join(', ') // ["grass", "fire"]   => "grass, fire"

  const text_weight = document.getElementById("pokemonweight")
  text_weight.innerHTML = "weight: " + weight + "lbs"

  const text_height = document.getElementById("pokemonheight")
  text_height.innerHTML = "height: " + height / 10 + "m"

  const text_name = document.getElementById("pokemonname")
  text_name.innerHTML = name

  const text_stats = document.getElementById("pokemonstats")

  for (const stat of stats) {
    const li = document.createElement("li")
    li.innerHTML = stat.name + ": " + stat.value
    text_stats.appendChild(li)
  }
}

start()
