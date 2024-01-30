'use client'

import Link from 'next/link';
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useRouter } from "next/navigation";

const LoadTeam = () => {

  const [teams, setTeams] = useState<Array<TeamInfo>>([]);

  const router = useRouter()

  useEffect(() => {
    invoke<Array<TeamInfo>>("get_teams_info")
      .then(setTeams)
  }, [])

  const handleLoad = (id: number) => {
    router.push(`/teams/${id}`)
  }

  return (
    <div className={styles.centerBox}>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
      {teams.map(team => (
        <div key={team.id} className={styles.teamBox} onClick={() => handleLoad(team.id)}>
          <div className={styles.boxContents}>
            <div>
              <div className={styles.nameHeader}>{team.name}</div>
              <div>{team.game}</div>
            </div>
            {/* <button className={styles.deleteButton}>Delete</button> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadTeam;