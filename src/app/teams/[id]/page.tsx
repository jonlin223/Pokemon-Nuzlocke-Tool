'use client'

import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import styles from './styles.module.css';
import EncounterBox from "./EncounterBox";
import { useRouter } from "next/navigation";

export default function Team({ params }: { params: { id: string } }) {
  
  const [encounters, setEncounters] = useState<Array<Encounter>>([])
  const [name, setName] = useState("")

  const router = useRouter()

  useEffect(() => {
    invoke<Team>("get_team", {id: Number(params.id)})
      .then(t => {
        setEncounters(t.encounters);
        setName(t.name);
      })
      .catch(alert)
  }, [encounters])

  // Handlers that we want to pass down to the EncounterBoxes
  const handleEncounterStatus = (location: string, status: string) => {
    invoke("update_encounter_status", {id: Number(params.id), location, status});
    setEncounters(encounters.map(e => {
      if (e.location === location) {
        console.log({ ...e, status: status})
        return { ...e, status: status}
      } else {
        return e
      }
    }))
  }

  const handlePokemonStatus = (location: string, status: string) => {
    invoke("update_pokemon_status", {id: Number(params.id), location, status});
    setEncounters(encounters.map(e => {
      if (e.location === location) {
        return { ...e, status:  { Caught: status } }
      } else {
        return e
      }
    }))
  }

  const handleRemovePokemon = (location: string) => {
    invoke("remove_pokemon", {id: Number(params.id), location});
    setEncounters(encounters.map(e => {
      if (e.location === location) {
        return { ...e, pokemon: null, status: "Incomplete"}
      } else {
        return e
      }
    }))
  }

  const handleAdd = (locationId: number) => {
    router.push(`/teams/${params.id}/${locationId}`)
  }

  return (
    <div className={styles.centerBox}>
      <div className={styles.teamName}>
        <h1>{name}</h1>
      </div>
      {encounters.map(e => (
        <EncounterBox key={e.location} params={{ encounter: {
          id: e.id,
          location: e.location,
          pokemon: e.pokemon,
          status: e.status
        }, handleEncounterStatus, handlePokemonStatus, handleRemovePokemon, handleAdd}}
        />
      ))}
    </div>
  )
}