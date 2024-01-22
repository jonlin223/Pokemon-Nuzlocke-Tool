pub enum Games {
    Platinum,
    BlackWhite
}

impl From<Games> for String {
    fn from(value: Games) -> Self {
        match value {
            Games::Platinum => String::from("Pokémon Platinum"),
            Games::BlackWhite => String::from("Pokémon Black & White"),
        }
    }
}