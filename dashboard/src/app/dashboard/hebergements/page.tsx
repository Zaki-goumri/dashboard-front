"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from '@/api/auth'


interface Hebergement {
  id: number;
  nom: string;
  type: string;
  capacite: number;
  adresse: string;
  disponibilite: boolean;
}


export default function HebergementsPage() {

  const fetchHebergements = async () => {
    const response = await axios.get('/Hauberge')
    if (response.status !== 200) {
      throw new Error('Failed to fetch hebergements')
    }
    return response.data
  }
  


  const [searchTerm, setSearchTerm] = useState('')
   const [hebergements, setHebergements] = useState<Hebergement[]>([])

  useEffect(() => {
    const getHebergements = async () => {
      try {
        const data = await fetchHebergements()
        console.log(data)
        setHebergements((...prevState) => [...prevState, ...data])
      } catch (error) {
        console.log(error)
      }
    }
    getHebergements()
  }, [])

 
  const filteredHebergements = hebergements.filter(h =>
    h.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Hébergements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Rechercher un hébergement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button>Ajouter un Hébergement</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHebergements.map((hebergement) => (
                <TableRow key={hebergement.id}>
                  <TableCell>{hebergement.nom}</TableCell>
                  <TableCell>{hebergement.type}</TableCell>
                  <TableCell>{hebergement.capacite}</TableCell>
                  <TableCell>{hebergement.adresse}</TableCell>
                  <TableCell>{hebergement.disponibilite ? 'Disponible' : 'Non disponible'}</TableCell>
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

