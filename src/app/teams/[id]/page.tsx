'use client'

import { invoke } from "@tauri-apps/api/tauri";
import Link from "next/link";
import { useEffect } from "react";

export default function Team({ params }: { params: { id: string } }) {
  
  useEffect(() => {
    invoke<Team>("get_team", {id: Number(params.id)})
      .then(console.log)
      .catch(alert)
  }, [])

  return (
    <div>
      <Link href="/">
        <h1>Hi There</h1>
      </Link>
    </div>
  )
}