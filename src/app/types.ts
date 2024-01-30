interface TeamInfo {
    id: number,
    name: string,
    game: string,
}

interface Team {
    name: string,
    game: string,
    encounters: Array<Encounter>,
}

interface Encounter {
    id: number,
    location: string,
    pokemon: Pokemon | null,
    status: string | PokemonStatus,
}

interface PokemonStatus {
    Caught: string
}

interface Pokemon {
    name: string,
    types: Array<string>
    sprite: string,
}