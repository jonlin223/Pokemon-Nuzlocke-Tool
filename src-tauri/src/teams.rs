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
                .enumerate()
                .map(|(id, location)| Encounter {id: id.try_into().unwrap(), location, pokemon: None, status: EncounterStatus::Incomplete })
                .collect();

            let team = Team { name: name.to_string(), game, encounters };
            let id = self.generate_id();
            self.teams.insert(id, team);
            println!("{:?}", self.teams);
            self.add_pokemon(id, "Starter", "Eevee", vec!["Normal"], "platinum_eevee.png");
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

    pub fn update_encounter_status(&mut self, id: u16, location: &str, status: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.update_encounter_status(location, status);
        println!("\n{:?}", self.teams);
    }

    pub fn add_pokemon(&mut self, id: u16, location: &str, name: &str, types: Vec<&str>, sprite: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.add_pokemon(location, name, types, sprite);
        println!("\n{:?}", self.teams);
    }

    pub fn update_pokemon_status(&mut self, id: u16, location: &str, status: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.update_pokemon_status(location, status);
        println!("\n{:?}", self.teams);
    }

    // TODO create a function that loads teams from the teams database file
}

#[derive(Debug, Clone, Serialize)]
pub struct Team {
    name: String,
    game: Game,
    encounters: Vec<Encounter>,
}

impl Team {
    fn update_encounter_status(&mut self, location: &str, status: &str) {
        let encounter = self.encounters.iter_mut()
            .find(|e| e.location == location)
            .unwrap();
        let encounter_status = if status == "Missed" {
            EncounterStatus::Missed
        } else {
            EncounterStatus::Incomplete
        };
        encounter.status = encounter_status;
    }

    fn add_pokemon(&mut self, location: &str, name: &str, types: Vec<&str>, sprite: &str) {
        let encounter = self.encounters.iter_mut()
            .find(|e| e.location == location)
            .unwrap();
        encounter.pokemon = Some(Pokemon::new(name, types, sprite));
        encounter.status = EncounterStatus::Caught(PokemonStatus::Alive);
    }

    fn update_pokemon_status(&mut self, location: &str, status: &str) {
        let encounter = self.encounters.iter_mut()
            .find(|e| e.location == location)
            .unwrap();
        let pokemon_status = if status == "Alive" {
            PokemonStatus::Alive
        } else {
            PokemonStatus::Dead
        };
        encounter.status = EncounterStatus::Caught(pokemon_status);
    }
}

#[derive(Debug, Clone, Serialize)]
struct Encounter {
    id: u16,
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