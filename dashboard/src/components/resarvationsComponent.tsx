"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import axios from '@/api/auth'


// Mock data
 export interface reservationsData {
    _id: string,
    user_id: string,
    age: number,
    parent_ID: string,
    room_number: string,
    check_in: Date,
    check_out: Date,
    hauberge:string,
    nature_reservation:"Gratuit"| "Payant"| "Restauration",
    restauration: number,
    status:"en attente"|"residé"|"terminé"
}



const fetchresidents = async () => {
    const response = await axios.get('/reservations')
    return response.data
  }

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [reservationData, setReservationData] = useState<reservationsData[]>([])
  const [error, setError] = useState('')




  const {data , isLoading, isError} =  useQuery({ queryKey:['residents'], queryFn: fetchresidents });
    
  useEffect(() => {
    if (data) {
      setReservationData(data.flat())
      }
  }, [data])

  if (isLoading) {
    return <Alert severity="info">Loading...</Alert>
  }
  if (isError) {
    return <Alert severity="error">{data}</Alert>
  }



const deleteReservation = async (id: string) => {
  try {
    const response = await axios.delete(`/reservations/${id}`)
    setReservationData(response.data)

  } catch (err) {
    console.log(err)
    setError(err instanceof Error ? err.message : 'An error occurred')
    
  }
}


  
  const filteredReservations = reservationData.filter((h: reservationsData) => 
      h.hauberge?.toLowerCase().includes(searchTerm.toLowerCase().trim()) || 
      h.room_number?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      h.user_id?.toString().includes(searchTerm.toLowerCase().trim())
  )

  return (
    <div className="space-y-6">
      {error &&
          <Alert severity="error">{error}</Alert>
      }
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Rechercher une réservation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro de Chambre</TableHead>
                <TableHead>Hébergement</TableHead>
                <TableHead>Résident</TableHead>
                <TableHead>Date d&apos;Entrée</TableHead>
                <TableHead>Date de Sortie</TableHead>
                <TableHead>Nature de Réservation</TableHead>
                <TableHead>Restauration (DZD)</TableHead>
                <TableHead>Etat</TableHead>
                <TableHead>Numéro de carte de Parent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.user_id}>
                  <TableCell>{reservation.room_number}</TableCell>
                  <TableCell>{reservation.hauberge}</TableCell>
                  <TableCell>{reservation.user_id}</TableCell>
                  <TableCell>{reservation.check_in ? new Date(reservation.check_in).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{reservation.check_out ? new Date(reservation.check_out).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{reservation.restauration}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                    <TableCell>{reservation.age<=18  ?  reservation.parent_ID : "Major"}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => {deleteReservation(reservation._id)}}>Annuler</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
