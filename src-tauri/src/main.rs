// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;

use app::{games::Game, teams::{TeamInfo, Teams}};

fn main() {
  tauri::Builder::default()
    .manage(Mutex::new(Teams::new()))
    .invoke_handler(tauri::generate_handler![greet, get_games, create_team, get_teams_info])
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
fn create_team(teams: tauri::State<Mutex<Teams>>, game_str: &str, name: &str) -> Result<(), String> {
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