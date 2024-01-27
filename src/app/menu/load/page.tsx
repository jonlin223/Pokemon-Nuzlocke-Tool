'use client'

import Link from 'next/link';
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const LoadTeam = () => {

  const [teams, setTeams] = useState<Array<TeamInfo>>([]);
  useEffect(() => {
    invoke<Array<TeamInfo>>("get_teams_info")
      .then(console.log)
  }, [])

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>

    </div>
  )
}

export default LoadTeam;