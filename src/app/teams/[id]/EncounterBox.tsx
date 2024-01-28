'use client'

import Image from 'next/image';
import styles from './styles.module.css';

import img from './../../../public/platinum_eevee.png';

export default function EncounterBox({ params }: { params: { encounter: Encounter } }) {

  return (
    <div className={styles.base}>
      {params.encounter.pokemon === null && typeof params.encounter.status === "string" &&
        <div>
          <div className={styles.locationText}>{params.encounter.location}</div>
          <hr/>
          <div className={styles.encounterBox1}>
            <select defaultValue={params.encounter.status}>
              <option >Incomplete</option>
              <option >Missed</option>
            </select>
            <button>Add Pokemon</button>
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
                src={img}
                alt={params.encounter.pokemon.name}
                width={80}
                height={80}
              />
              <div>{params.encounter.pokemon.name}</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}