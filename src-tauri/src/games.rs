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