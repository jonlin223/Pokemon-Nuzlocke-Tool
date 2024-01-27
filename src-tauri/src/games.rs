use serde::Serialize;

#[derive(Debug, Copy, Clone)]
pub enum Game {
    Platinum,
    BlackWhite
}

impl From<Game> for String {
    fn from(value: Game) -> Self {
        match value {
            Game::Platinum => String::from("Pokémon Platinum"),
            Game::BlackWhite => String::from("Pokémon Black & White"),
        }
    }
}

impl TryInto<Game> for &str {
    type Error = String;

    fn try_into(self) -> Result<Game, Self::Error> {
        match self {
            "Pokémon Platinum" => Ok(Game::Platinum),
            "Pokémon Black & White" => Ok(Game::BlackWhite),
            _ => Err(format!("Could not find game {}", self))
        }
    }
}