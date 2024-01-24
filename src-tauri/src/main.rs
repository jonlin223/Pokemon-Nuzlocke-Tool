// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use app::{games::Game, pokedex::get_locations, teams::Teams};

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet, get_games])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    println!("{:?}", get_locations(Game::Platinum));
    format!("Hello {}!", name)
}

#[tauri::command]
fn get_games() -> Vec<String> {
    vec![Game::Platinum.into(), Game::BlackWhite.into()]
}

#[tauri::command]
fn create_team(teams: tauri::State<Teams>, game: &str, name: &str) -> Result<(), String> {
    todo!()
}