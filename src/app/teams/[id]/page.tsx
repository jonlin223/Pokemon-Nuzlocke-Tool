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
      <EncounterBox params={{ encounter: {
          location: "Starter",
          pokemon: { name: "Eevee", sprite: "platinum_eevee.png", types: ["Normal", "Dragon"] },
          status: {Caught: "Alive"}
        }}}
      />
      <EncounterBox params={{ encounter: {
          location: "Route 1",
          pokemon: null,
          status: "Incomplete"
        }}}
      />
    </div>
  )
}