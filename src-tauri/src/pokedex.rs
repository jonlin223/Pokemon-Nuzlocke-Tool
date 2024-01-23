struct Pokedex {
    locations: Vec<String>,
    pokemon: Vec<Pokemon>
}

pub struct Pokemon {
    name: String,
    types:  Vec<String>,
    sprite: String,
}