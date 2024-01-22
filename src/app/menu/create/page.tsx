'use client'

import Link from "next/link";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function CreateTeam() {

  useEffect(() => {
    invoke<Array<string>>('get_games')
      .then(res => setGames(res))
      .catch(console.error)
  }, [])

  const [games, setGames] = useState<Array<string>>([]);

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
      <div>
        <label htmlFor="team" className={styles.label}>Name your team!:</label>
        <input name="team" type="text" id="teamName" style={{marginBottom: "10px"}} className={styles.input} required></input>
      </div>
      <div>
        <label htmlFor="game" className={styles.label}>Select your game!:</label>
        <select name="game" className={styles.input}>
          {games.map(gs => (
            <option value={gs} key={gs}>{gs}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

// TODO
// Backend function to get available games
// Backend function to create a team given a name and a game
  // Check if name already taken, if so, send error
  // Also, some error if no name given
  // If we good, create a file for the team
    // List of encounters
    // Encounter {location: String, pokemon : Option<Pokemon>, encounter_status: caught/missed/not done}    ----> initialise to None
    // Pokemon {name: String, sprite: String, status: alive/dead}
