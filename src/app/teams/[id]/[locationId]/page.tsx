'use client'

import { invoke } from "@tauri-apps/api/tauri"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import PokemonBox from "./PokemonBox"
import { useRouter } from "next/navigation";

export default function Add({ params }: { params: { id: string, locationId: string } }) {

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([])
  const [filteredList, setFilteredList] = useState<Array<Pokemon>>([])
  const [filterInput, setFilterInput] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [nickname, setNickname] = useState("")

  const router = useRouter();

  useEffect(() => {
    console.log(params.locationId)
    invoke<Array<Pokemon>>("get_pokemon", {id: Number(params.id)})
      .then(pokemons => {
        setPokemonList(pokemons);
        setFilteredList(pokemons);
      })
  }, [])

  useEffect(() => {
    setFilteredList(pokemonList.filter(p => 
      p.name.toLowerCase().startsWith(filterInput.toLowerCase())));
  }, [filterInput, pokemonList])

  const handleSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const handleAdd = () => {
    if (nickname === "") {
      alert("Must Enter A Nickname")
    } else if(selectedPokemon === null) {
      alert("Must Select A Pokemon")
    } else {
      invoke("add_pokemon", { id: Number(params.id), locationId: Number(params.locationId), name: nickname, types: selectedPokemon.types, sprite: selectedPokemon.sprite })
      router.push(`/teams/${params.id}`)
    }
  }

  return (
    <div className={styles.centerBox}>
      <div style={{ display: "flex", justifyContent: "flex-start", width: "300px", marginBottom: "3px", marginTop: "15px" }}>
        <Link href={`/teams/${params.id}`}>
          Back
        </Link>
      </div>
      <div className={styles.pokemonInfo}>
        {selectedPokemon === null &&
          <div className={styles.emptyBox}>
            No Pokemon Selected
          </div>
        }
        {selectedPokemon !== null &&
          <PokemonBox pokemon={selectedPokemon} handleSelect={handleSelect}/>
        }
        <div>
          <input required onChange={e => setNickname(e.target.value)}/>
          <button className={styles.addButton} onClick={() => handleAdd()}>Add Pokemon</button>
        </div>
      </div>
      <hr style={{ width: "310px", backgroundColor: "black", height: "1px", color: "black", border: "none" }}/>
      <input name="filter" className={styles.filterInput} value={filterInput} onChange={e => setFilterInput(e.target.value)}/>
      {filteredList.map(p => (
        <PokemonBox pokemon={p} handleSelect={handleSelect} key={p.name} />
      ))}
    </div>
  )

}