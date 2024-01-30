'use client'

import { invoke } from "@tauri-apps/api/tauri"
import { useEffect } from "react"

export default function Add({ params }: { params: { id: string, locationId: string } }) {

  useEffect(() => {
    console.log(params.locationId)
    invoke<Array<Pokemon>>("get_pokemon", {id: Number(params.id)})
      .then(console.log)
  })

}