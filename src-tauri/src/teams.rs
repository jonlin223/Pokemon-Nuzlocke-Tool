use std::collections::HashMap;

use crate::{games::Game, pokedex::Pokemon};

pub struct Teams {
    teams: HashMap<String, Team>
}

impl Teams {
    pub fn add_team(&mut self, game: Game, name: &str) -> Result<(), String> {
        // Check that team doesn't already exist
        if self.teams.contains_key(name) {
            Err(format!("Team with name {name} already exists."))
        }
        
        // Otherwise load in a team given the region
        else {
            Ok(())
        }

    }
}

struct Team {
    game: Game,
    encounters: Vec<Encounter>
}

impl Team {
    fn generate_team(game: Game) -> Self {
        // TODO this function needs to look at our pokedex files and generate teams based off that
        Team { game, encounters: vec![] }
    }
}

struct Encounter {
    location: String,
    pokemon: Pokemon,
    status: EncounterStatus
}

enum PokemonStatus {
    Alive,
    Dead
}

enum EncounterStatus {
    Caught(PokemonStatus),
    Missed,
    Incomplete
}