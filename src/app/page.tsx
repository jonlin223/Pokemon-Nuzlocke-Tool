'use client' // TODO figure out if it would be better to limit client components to certain parts of the code

import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(console.log)
      .catch(console.error)
  }, [])

  return (
    <div>
      Hi there
    </div>
  )
}
