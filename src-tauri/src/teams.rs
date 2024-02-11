use std::{collections::HashMap, fs};

use serde::{Deserialize, Serialize};

use crate::{games::Game, pokedex::{get_locations, Pokemon}};

#[derive(Debug, Serialize, Deserialize, Clone)]
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
            self.save_teams();
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
        self.save_teams();
    }

    pub fn add_pokemon(&mut self, id: u16, location_id: u16, name: &str, types: Vec<&str>, sprite: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.add_pokemon(location_id, name, types, sprite);
        self.save_teams();
    }

    pub fn update_pokemon_status(&mut self, id: u16, location: &str, status: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.update_pokemon_status(location, status);
        self.save_teams();
    }

    pub fn remove_pokemon(&mut self, id: u16, location: &str) {
        let team = self.teams.get_mut(&id).unwrap();
        team.remove_pokemon(location);
        self.save_teams();
    }

    pub fn get_game_from_id(&self, id: u16) -> Game {
        self.teams.get(&id).unwrap().game
    }

    pub fn load_teams() -> Self {
        if std::path::Path::try_exists(std::path::Path::new("./../data/teams.json")).expect("Something really bad happened") {
            let path = String::from("./../data/teams.json");
            let teams_string = fs::read_to_string(path).unwrap();
            let tmp: String = serde_json::from_str(&teams_string).unwrap();
            let teams: Teams = serde_json::from_str(&tmp).unwrap();
            teams
        } else {
            let teams = Teams::new();
            let file = std::fs::File::create("./../data/teams.json").expect("Something bad happened");
            let json = serde_json::to_string(&teams).unwrap();
            serde_json::to_writer_pretty(file, &json).unwrap();
            teams
        }
    }

    fn save_teams(&self) {
        let thread_item = self.clone();
        std::thread::spawn(move || {
            let file = std::fs::File::create("./../data/teams.json").unwrap();
            let json = serde_json::to_string(&thread_item).unwrap();
            serde_json::to_writer_pretty(file, &json).unwrap();
        });
    }

    pub fn delete_team(&mut self, id: u16) {
        self.teams.remove(&id);
        self.save_teams();
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
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

    fn add_pokemon(&mut self, location_id: u16, name: &str, types: Vec<&str>, sprite: &str) {
        let encounter = self.encounters.iter_mut()
            .find(|e| e.id == location_id)
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

    fn remove_pokemon(&mut self, location: &str) {
        let encounter = self.encounters.iter_mut()
            .find(|e| e.location == location)
            .unwrap();
        encounter.pokemon = None;
        encounter.status = EncounterStatus::Incomplete;
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Encounter {
    id: u16,
    location: String,
    pokemon: Option<Pokemon>,
    status: EncounterStatus
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum PokemonStatus {
    Alive,
    Dead
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum EncounterStatus {
    Caught(PokemonStatus),
    Missed,
    Incomplete
}