"use client"

import { housingAtom } from '@/jotai/atom'
import { useAtomValue } from 'jotai'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'



export function OccupancyChart() {
  const [isMounted, setIsMounted] = useState(false)
  const data = useAtomValue(housingAtom)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="occupancy" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

