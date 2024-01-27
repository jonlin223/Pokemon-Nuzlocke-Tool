use std::collections::HashMap;

use crate::{games::Game, pokedex::{get_locations, Pokemon}};

#[derive(Debug)]
pub struct Teams {
    teams: HashMap<String, Team>
}

impl Teams {
    pub fn new() -> Self {
        Teams { teams: HashMap::new() }
    }

    pub fn add_team(&mut self, game: Game, name: &str) -> Result<(), String> {
        // Check that team doesn't already exist
        if self.teams.contains_key(name) {
            Err(format!("Team with name {name} already exists."))
        }
        
        // Otherwise load in a team given the region
        else {
            let encounters = get_locations(&game)
                .into_iter()
                .map(|location| Encounter {location, pokemon: None, status: EncounterStatus::Incomplete })
                .collect();
            
            let team = Team { game, encounters };

            self.teams.insert(name.to_string(), team);
            println!("{:?}", self.teams);
            Ok(())
        }

    }

    // TODO create a function that loads teams from the teams database file
}

#[derive(Debug)]
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

#[derive(Debug)]
struct Encounter {
    location: String,
    pokemon: Option<Pokemon>,
    status: EncounterStatus
}

#[derive(Debug)]
enum PokemonStatus {
    Alive,
    Dead
}

#[derive(Debug)]
enum EncounterStatus {
    Caught(PokemonStatus),
    Missed,
    Incomplete
}