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
  }, [teams])

  const handleLoad = (id: number) => {
    router.push(`/teams/${id}`)
  }

  const handleDelete = (id: number) => {
    invoke("delete_team", {id});
    setTeams(teams.filter(team => team.id !== id))
  }

  return (
    <div className={styles.centerBox}>
      <div className={styles.newTeamDiv}>
        <Link href="/menu/create">
          New Team
        </Link>
      </div>
      {teams.map(team => (
        <div key={team.id} className={styles.teamContainer}>
          <div className={styles.teamBox} onClick={() => handleLoad(team.id)}>
            <div className={styles.boxContents}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image alt="pokeball" src="/pokeball.svg" width={45} height={45}/>
                <div style={{ marginLeft: "10px" }}>
                  <div className={styles.nameHeader}>{team.name}</div>
                  <div>{team.game}</div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.deleteButton} onClick={() => handleDelete(team.id)}>
            <Image alt="delete-icon" src="delete-icon.svg" width={20} height={20}/>
          </button>
        </div>
      ))}
    </div>
  )
}
