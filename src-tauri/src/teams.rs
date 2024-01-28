use std::collections::HashMap;

use serde::Serialize;

use crate::{games::Game, pokedex::{get_locations, Pokemon}};

#[derive(Debug, Serialize)]
pub struct Teams {
    teams: HashMap<u16, Team>
}

#[derive(Debug, Serialize)]
pub struct TeamInfo {
    id: u16,
    name: String,
    game: String
}

impl Teams {
    pub fn new() -> Self {
        Teams { teams: HashMap::new() }
    }

    pub fn add_team(&mut self, game: Game, name: &str) -> Result<u16, String> {
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
            let id = self.generate_id();
            self.teams.insert(id, team);
            println!("{:?}", serde_json::to_string_pretty(&self.teams).unwrap());
            Ok(id)
        }
    }

    fn generate_id(&self) -> u16 {
        let mut id = 1;
        while self.teams.contains_key(&id) {
            id += 1;
        }
        return id;
    }

    pub fn get_teams_info(&self) -> Vec<TeamInfo> {
        self.teams.iter().map(|(id, t)| TeamInfo { id: *id, name: t.name.clone(), game: t.game.into() }).collect()
    }

    pub fn get_team(&self, id: &u16) -> Result<Team, String> {
        self.teams.get(id).map(|t| t.clone()).ok_or_else(|| format!("Could not find team with id {}", id))
    }

    // TODO create a function that loads teams from the teams database file
}

#[derive(Debug, Clone, Serialize)]
pub struct Team {
    name: String,
    game: Game,
    encounters: Vec<Encounter>,
}

#[derive(Debug, Clone, Serialize)]
struct Encounter {
    location: String,
    pokemon: Option<Pokemon>,
    status: EncounterStatus
}

#[derive(Debug, Clone, Serialize)]
enum PokemonStatus {
    Alive,
    Dead
}

#[derive(Debug, Clone, Serialize)]
enum EncounterStatus {
    Caught(PokemonStatus),
    Missed,
    Incomplete
}