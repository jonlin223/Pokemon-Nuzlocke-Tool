'use client'

import Link from 'next/link';
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const LoadTeam = () => {

  const [teams, setTeams] = useState<Array<TeamInfo>>([]);
  useEffect(() => {
    invoke<Array<TeamInfo>>("get_teams_info")
      .then(setTeams)
  }, [])

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
      {teams.map(team => (
        <div key={team.id} className={styles.teamBox}>
          <div className={styles.boxContents}>
            <div>
              <div className={styles.nameHeader}>{team.name}</div>
              <div>{team.game}</div>
            </div>
            <button className={styles.deleteButton}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadTeam;