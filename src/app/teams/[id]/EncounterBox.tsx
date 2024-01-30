'use client'

import Image from 'next/image';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface Params {
  encounter: Encounter,
  handleEncounterStatus: (location: string, ststus: string) => void,
  handlePokemonStatus: (location: string, ststus: string) => void,
}

export default function EncounterBox({ params }: { params: Params }) {

  return (
    <div className={styles.base}>
      {params.encounter.pokemon === null && typeof params.encounter.status === "string" &&
        <div>
          <div className={styles.locationText}>{params.encounter.location}</div>
          <hr/>
          <div className={styles.encounterBox1}>
            <select value={params.encounter.status} onChange={e => params.handleEncounterStatus(params.encounter.location, e.target.value)}>
              <option value="Incomplete">Incomplete</option>
              <option value="Missed">Missed</option>
            </select>
            <button disabled={params.encounter.status === "Missed"}>Add Pokemon</button>
          </div>
        </div>
      }
      {params.encounter.pokemon !== null && typeof params.encounter.status === "object" &&
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
              <button disabled={params.encounter.status.Caught === "Dead"}>Remove Pokemon</button>
              <select value={params.encounter.status.Caught} onChange={e => params.handlePokemonStatus(params.encounter.location, e.target.value)}>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
              </select>
            </div>
          </div>
        </div>
      }
    </div>
  )
}