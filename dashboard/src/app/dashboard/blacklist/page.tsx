"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data
const blacklistData = [
  { id: 1, nom: "Doe", prenom: "John", numero_carte_identite: "1234567890" },
  { id: 2, nom: "Smith", prenom: "Jane", numero_carte_identite: "0987654321" },
  { id: 3, nom: "Brown", prenom: "Bob", numero_carte_identite: "1357924680" },
]

export default function BlacklistPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlacklist = blacklistData.filter(person =>
    person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.numero_carte_identite.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion de la Liste Noire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Rechercher une personne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button>Ajouter à la Liste Noire</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Numéro de Carte d'Identité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlacklist.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>{person.nom}</TableCell>
                  <TableCell>{person.prenom}</TableCell>
                  <TableCell>{person.numero_carte_identite}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">Retirer de la Liste Noire</Button>
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

