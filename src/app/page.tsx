'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Link from 'next/link'
import { invoke } from '@tauri-apps/api/tauri';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {

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
      <div className={styles.newTeamDiv}>
        <Link href="/menu/create">
          New Team
        </Link>
      </div>
      {teams.map(team => (
        <div key={team.id} className={styles.teamBox} onClick={() => handleLoad(team.id)}>
          <div className={styles.boxContents}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
              <Image alt="pokeball" src="/pokeball.svg" width={45} height={45}/>
              <div style={{ marginLeft: "10px" }}>
                <div className={styles.nameHeader}>{team.name}</div>
                <div>{team.game}</div>
              </div>
            </div>
            {/* <button className={styles.deleteButton}>Delete</button> */}
          </div>
        </div>
      ))}
    </div>
  )
}
