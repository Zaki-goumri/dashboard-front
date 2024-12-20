"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', reservations: 65 },
  { name: 'Feb', reservations: 59 },
  { name: 'Mar', reservations: 80 },
  { name: 'Apr', reservations: 81 },
  { name: 'May', reservations: 56 },
  { name: 'Jun', reservations: 55 },
]

export function ReservationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reservations" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

