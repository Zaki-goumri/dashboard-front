"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const residentsData = [
  { id: 1, nom: "Dupont", prenom: "Marie", date_naissance: "1990-05-15", lieu_naissance: "Alger", sexe: "F", numero_carte_identite: "1234567890", permission_parentale: false },
  { id: 2, nom: "Benali", prenom: "Ahmed", date_naissance: "1985-09-22", lieu_naissance: "Oran", sexe: "M", numero_carte_identite: "0987654321", permission_parentale: false },
  { id: 3, nom: "Cherif", prenom: "Amina", date_naissance: "2007-03-10", lieu_naissance: "Boumerdes", sexe: "F", numero_carte_identite: "2468135790", permission_parentale: true },
]

export default function ResidentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResidents = residentsData.filter(resident =>
    resident.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.numero_carte_identite.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Résidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Rechercher un résident..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button>Ajouter un Résident</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Date de Naissance</TableHead>
                <TableHead>Lieu de Naissance</TableHead>
                <TableHead>Sexe</TableHead>
                <TableHead>Numéro de Carte d'Identité</TableHead>
                <TableHead>Permission Parentale</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResidents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>{resident.nom}</TableCell>
                  <TableCell>{resident.prenom}</TableCell>
                  <TableCell>{resident.date_naissance}</TableCell>
                  <TableCell>{resident.lieu_naissance}</TableCell>
                  <TableCell>{resident.sexe}</TableCell>
                  <TableCell>{resident.numero_carte_identite}</TableCell>
                  <TableCell>{resident.permission_parentale ? 'Oui' : 'Non'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Modifier</Button>
                    <Button variant="destructive" size="sm">Supprimer</Button>
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

