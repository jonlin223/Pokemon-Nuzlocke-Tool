// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;

use app::{games::Game, teams::{Team, TeamInfo, Teams}};

fn main() {
  tauri::Builder::default()
    .manage(Mutex::new(Teams::new()))
    .invoke_handler(tauri::generate_handler![greet, get_games, create_team, get_teams_info, get_team, update_encounter_status, add_pokemon, update_pokemon_status])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    println!("HI");
    format!("Hello {}!", name)
}

#[tauri::command]
fn get_games() -> Vec<String> {
    vec![Game::Platinum.into(), Game::BlackWhite.into()]
}

#[tauri::command]
fn create_team(teams: tauri::State<Mutex<Teams>>, game_str: &str, name: &str) -> Result<u16, String> {
    if name == "" {
        Err(String::from("Must enter a team name!"))
    } else {
        let game = game_str.try_into()?;
        teams.lock().unwrap().add_team(game, name)
    }
}

#[tauri::command]
fn get_teams_info(teams: tauri::State<Mutex<Teams>>) -> Vec<TeamInfo> {
    teams.lock().unwrap().get_teams_info()
}

#[tauri::command]
fn get_team(teams: tauri::State<Mutex<Teams>>, id: u16) -> Result<Team, String>{
    teams.lock().unwrap().get_team(&id)
}

#[tauri::command]
fn update_encounter_status(teams: tauri::State<Mutex<Teams>>, id: u16, location: &str, status: &str) {
    teams.lock().unwrap().update_encounter_status(id, location, status);
}

#[tauri::command]
fn add_pokemon(teams: tauri::State<Mutex<Teams>>, id: u16, location: &str, name: &str, types: Vec<&str>, sprite: &str) {
    teams.lock().unwrap().add_pokemon(id, location, name, types, sprite);
}

#[tauri::command]
fn update_pokemon_status(teams: tauri::State<Mutex<Teams>>, id: u16, location: &str, status: &str) {
    teams.lock().unwrap().update_pokemon_status(id, location, status);
}
