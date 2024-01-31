'use client'

import { invoke } from "@tauri-apps/api/tauri"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import Image from "next/image"
import ptypes from "../ptypes.module.css"

export default function Add({ params }: { params: { id: string, locationId: string } }) {

  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([])

  useEffect(() => {
    console.log(params.locationId)
    invoke<Array<Pokemon>>("get_pokemon", {id: Number(params.id)})
      .then(setPokemonList)
  }, [])

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
      <input name="filter" className={styles.filterInput}/>
      {pokemonList.map(p => (
        <div key={p.name} className={styles.pokemonBox}>
          <div style={{ display: "inherit", alignItems: "center" }}>
            <Image
              src={'/' + `${p.sprite}`}
              alt={p.name}
              width={30}
              height={30}
              style={{ marginRight: "10px" }}
            />
            <div>{p.name}</div>
          </div>
          <div style={{ display: "inherit", alignItems: "center" }}>
            {p.types.map(t => (
              <div key={t} className={`${styles.typeText} ${ptypes[t]}`}>
                {t}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

}