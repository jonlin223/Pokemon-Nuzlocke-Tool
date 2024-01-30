use std::fs;

use serde::{Deserialize, Serialize};

use crate::games::Game;

#[derive(Deserialize)]
struct Pokedex {
    locations: Vec<String>,
    pokemon: Vec<Pokemon>
}

pub fn get_locations(game: &Game) -> Vec<String> {
    let file = match game {
        Game::Platinum => "platinum.json",
        Game::BlackWhite => "black-white.json",
    };

    let path = String::from("./pokedex/") + file;
    let pokedex_str = fs::read_to_string(path).unwrap();

    let tmp: String = serde_json::from_str(&pokedex_str).unwrap();
    let pokedex: Pokedex = serde_json::from_str(&tmp).unwrap();
    pokedex.locations
}

pub fn get_pokemon(game: &Game) -> Vec<Pokemon> {
    let file = match game {
        Game::Platinum => "platinum.json",
        Game::BlackWhite => "black-white.json",
    };

    let path = String::from("./pokedex/") + file;
    let pokedex_str = fs::read_to_string(path).unwrap();

    let tmp: String = serde_json::from_str(&pokedex_str).unwrap();
    let pokedex: Pokedex = serde_json::from_str(&tmp).unwrap();
    pokedex.pokemon
}

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Pokemon {
    name: String,
    types:  Vec<String>,
    sprite: String,
}

impl Pokemon {
    pub fn new(name: &str, types: Vec<&str>, sprite: &str) -> Self {
        Pokemon { name: name.to_string(), types: types.into_iter().map(|t| t.to_string()).collect(), sprite: sprite.to_string() }
    }
}