'use client' // TODO figure out if it would be better to limit client components to certain parts of the code

import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'

export default function Home() {
  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(console.log)
      .catch(console.error)
  }, [])

  // Ok here's what we need to do
  // Pages
    // Main page
      // Create new team
      // Load existing team
    // Load Existing Team
      // List of Existing Teams (Name, num caught, region, last edited?)
      // Can delete teams
    // Create New Team
      // Select region (or maybe game)
      // Give team a name
    // Team page
      // List of encounter areas in the region (try to list in order of when encounter is possible)
      // For each encounter, have button that allows you to add an encounter
      // or if encounter already met, show pokemon, nickname, avatar?
        // Also need to have a button to mark the mon as dead
    // Encounter page
      // Search through list of pokemon (maybe filter it by the region we are in)
      // Pokemon nickname

  // Backend
    // Pokedex
      // Just a list of pokemon and references to their images
      // maybe we want to include region for filtering purposes
    // Team
      // Again a list of pokemon with references to images
      // However, we also want to add nickname + alive status
      // Actually maybe a list of locations - attach a pokemon to each location
    // Functions
      // Add to team
      // mark mon as dead
      // create a team
      // delete a team
    // database
      // we have to implement all this in a database as well

  return (
    <div className={`${styles.centerBox} ${styles.vertical}`}>
      <h1>
        Hi There
      </h1>
      <div>
        <button className={styles.button}>
          <Link href="/menu/create">
            Create Team
          </Link>
        </button>
        <button className={styles.button}>
          <Link href="/menu/load">
            Load Team
          </Link>
        </button>
      </div>
    </div>
  )
}
