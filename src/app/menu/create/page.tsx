'use client'

import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from "next/navigation";

export default function CreateTeam() {

  useEffect(() => {
    invoke<Array<string>>('get_games')
      .then(res => setGames(res))
      .catch(console.error)
  }, [])

  const [games, setGames] = useState<Array<string>>([]);
  const [name, setName] = useState("");
  const [game, setGame] = useState("");

  const router = useRouter()

  useEffect(() => {
    if (games.length != 0) {
      setGame(games[0])
    }
  }, [games])

  const create = () => {
    console.log(name)
    console.log(game)

    invoke('create_team', {gameStr: game, name: name})
      .then((id) => router.push(`/teams/${id}`))
      .catch(alert)
  }

  return (
    <div className={styles.centerBox}>
      <h1>Add Your Team Details!</h1>
      <div>
        <label htmlFor="team" className={styles.label}>Name your team!:</label>
        <input name="team" type="text" id="teamName" style={{marginBottom: "10px"}} className={`${styles.input} ${styles.textInput}`} onChange={event => setName(event.target.value)}required></input>
      </div>
      <div>
        <label htmlFor="game" className={styles.label}>Select your game!:</label>
        <select name="game" className={`${styles.input} ${styles.gameSelect}`} onChange={event => setGame(event.target.value)}>
          {games.map(gs => (
            <option value={gs} key={gs}>{gs}</option>
          ))}
        </select>
      </div>
      <div>
        <button className={styles.createButton} onClick={create}>Create Team</button>
      </div>
    </div>
  )
}

// TODO
// Backend function to create a team given a name and a game
  // Check if name already taken, if so, send error
  // Also, some error if no name given
  // If we good, create a file for the team
    // List of encounters
    // Encounter {location: String, pokemon : Option<Pokemon>, encounter_status: caught/missed/not done}    ----> initialise to None
    // Pokemon {name: String, sprite: String, status: alive/dead}
