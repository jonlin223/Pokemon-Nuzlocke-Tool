'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import ptypes from '../ptypes.module.css'

interface Params {
  pokemon: Pokemon
  handleSelect: (pokemon: Pokemon) => void
}

export default function PokemonBox(params: Params) {
  return (
    <div key={params.pokemon.name} className={styles.pokemonBox} onClick={() => params.handleSelect(params.pokemon)}>
      <div style={{ display: "inherit", alignItems: "center" }}>
        <Image
          src={'/' + `${params.pokemon.sprite}`}
          alt={params.pokemon.name}
          width={30}
          height={30}
          style={{ marginRight: "10px" }}
        />
        <div>{params.pokemon.name}</div>
      </div>
      <div style={{ display: "inherit", alignItems: "center" }}>
        {params.pokemon.types.map(t => (
          <div key={t} className={`${styles.typeText} ${ptypes[t]}`}>
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}