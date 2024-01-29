'use client'

import { invoke } from "@tauri-apps/api/tauri";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './styles.module.css';
import EncounterBox from "./EncounterBox";

export default function Team({ params }: { params: { id: string } }) {
  
  const [encounters, setEncounters] = useState<Array<Encounter>>([])

  useEffect(() => {
    invoke<Team>("get_team", {id: Number(params.id)})
      .then(t => setEncounters(t.encounters))
      .catch(alert)
  }, [])

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
      {encounters.map(e => (
        <EncounterBox key={e.location} params={{ encounter: {
          location: e.location,
          pokemon: e.pokemon,
          status: e.status
        }, id: Number(params.id)}}
        />
      ))}
    </div>
  )
}