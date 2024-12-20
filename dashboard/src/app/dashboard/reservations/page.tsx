"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const reservationsData = [
  { 
    id: 1, 
    numero_chambre: "A101", 
    date_entree: "2023-07-01", 
    date_sortie: "2023-07-07", 
    nature_reservation: "Non Gratuit", 
    restauration: 150,
    nom_resident: "Dupont Marie",
    hebergement: "Villa Bleue"
  },
  { 
    id: 2, 
    numero_chambre: "B205", 
    date_entree: "2023-07-03", 
    date_sortie: "2023-07-10", 
    nature_reservation: "Gratuit", 
    restauration: 0,
    nom_resident: "Benali Ahmed",
    hebergement: "Camp Étoile"
  },
  { 
    id: 3, 
    numero_chambre: "C310", 
    date_entree: "2023-07-05", 
    date_sortie: "2023-07-12", 
    nature_reservation: "Non Gratuit", 
    restauration: 200,
    nom_resident: "Cherif Amina",
    hebergement: "Maison du Soleil"
  },
]

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredReservations = reservationsData.filter(reservation =>
    reservation.numero_chambre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.date_entree.includes(searchTerm) ||
    reservation.date_sortie.includes(searchTerm) ||
    reservation.nom_resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.hebergement.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
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
            <Button>Nouvelle Réservation</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro de Chambre</TableHead>
                <TableHead>Hébergement</TableHead>
                <TableHead>Résident</TableHead>
                <TableHead>Date d'Entrée</TableHead>
                <TableHead>Date de Sortie</TableHead>
                <TableHead>Nature de Réservation</TableHead>
                <TableHead>Restauration (DZD)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.numero_chambre}</TableCell>
                  <TableCell>{reservation.hebergement}</TableCell>
                  <TableCell>{reservation.nom_resident}</TableCell>
                  <TableCell>{reservation.date_entree}</TableCell>
                  <TableCell>{reservation.date_sortie}</TableCell>
                  <TableCell>{reservation.nature_reservation}</TableCell>
                  <TableCell>{reservation.restauration}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Modifier</Button>
                    <Button variant="destructive" size="sm">Annuler</Button>
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

