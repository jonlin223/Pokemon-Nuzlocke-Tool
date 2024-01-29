'use client'

import Image from 'next/image';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

export default function EncounterBox({ params }: { params: { encounter: Encounter } }) {

  const [encounterStatus, setEncounterStatus] = useState("Incomplete");
  const [pokemonStatus, setPokemonStatus] = useState("Alive");

  useEffect(() => {
    if (typeof params.encounter.status === "string") {
      setEncounterStatus(params.encounter.status);
    } else {
      setPokemonStatus(params.encounter.status.Caught)
    }
  }, [])

  return (
    <div className={styles.base}>
      {params.encounter.pokemon === null && typeof params.encounter.status === "string" &&
        <div>
          <div className={styles.locationText}>{params.encounter.location}</div>
          <hr/>
          <div className={styles.encounterBox1}>
            <select value={encounterStatus} onChange={e => setEncounterStatus(e.target.value)}>
              <option>Incomplete</option>
              <option>Missed</option>
            </select>
            <button disabled={encounterStatus === "Missed"}>Add Pokemon</button>
          </div>
        </div>
      }
      {params.encounter.pokemon !== null &&
        <div>
          <div className={styles.locationText}>{params.encounter.location}</div>
          <hr/>
          <div className={styles.encounterBox2}>
            <div className={styles.pokemonInfo}>
              <Image
                src={'/' + `${params.encounter.pokemon.sprite}`}
                alt={params.encounter.pokemon.name}
                width={80}
                height={80}
              />
              <div className={styles.nameText}>{params.encounter.pokemon.name}</div>
              <div className={styles.typeList}>
                {params.encounter.pokemon.types.map(t => (
                  <div key={t} className={`${styles.typeText} ${styles[t]}`}>{t}</div>
                ))}
              </div>
            </div>
            <div className={styles.pokemonActions}>
              <button disabled={pokemonStatus === "Dead"}>Remove Pokemon</button>
              <select value={pokemonStatus} onChange={e => setPokemonStatus(e.target.value)}>
                <option>Alive</option>
                <option>Dead</option>
              </select>
            </div>
          </div>
        </div>
      }
    </div>
  )
}