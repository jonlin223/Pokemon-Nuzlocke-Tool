use std::collections::HashMap;

use crate::{games::Game, pokedex::{get_locations, Pokemon}};

#[derive(Debug)]
pub struct Teams {
    teams: HashMap<u16, Team>
}

impl Teams {
    pub fn new() -> Self {
        Teams { teams: HashMap::new() }
    }

    pub fn add_team(&mut self, game: Game, name: &str) -> Result<(), String> {
        // Check that team doesn't already exist
        if self.teams.iter().any(|t| t.1.name == name) {
            Err(format!("Team with name {name} already exists."))
        }
        
        // Otherwise load in a team given the region
        else {
            let encounters = get_locations(&game)
                .into_iter()
                .map(|location| Encounter {location, pokemon: None, status: EncounterStatus::Incomplete })
                .collect();

            let team = Team { name: name.to_string(), game, encounters };

            self.teams.insert(self.generate_id(), team);
            println!("{:?}", self.teams);
            Ok(())
        }

    }

    fn generate_id(&self) -> u16 {
        let mut id = 1;
        while self.teams.contains_key(&id) {
            id += 1;
        }
        return id;
    }

    // TODO create a function that loads teams from the teams database file
}

#[derive(Debug)]
struct Team {
    name: String,
    game: Game,
    encounters: Vec<Encounter>,
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