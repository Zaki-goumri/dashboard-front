"use client"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import {v4} from 'uuid'
import  AddHebergementForm  from '@/components/haubergeForm'
import { useAtom, useSetAtom } from 'jotai'
import { isVisible, updateHousingAtom } from '@/lib/atom'


export interface HebergementFormData {
    _id: string,
    type: string,
    capacity: number,
    name: string,
    location: {
      latitude: number,
      longitude: number
    },
    address: string,
    email: string,
    phone: string,
    availability: boolean,
    PersonReservedNbr: number,
    Offres: string[],
    sexe: 'male' | 'female',
    pricePerNight: number
}

interface Hebergement extends HebergementFormData {
    _id: string,
}

const fetchHebergements = async () => {
  const response = await axios.get('/Hauberge')
  return response.data
}

export default function HebergementsPage() {

   const [searchTerm, setSearchTerm] = useState('')
   const [hebergements, setHebergements] = useState<Hebergement[]>([])
   const [isShowingForm, setIsShowingForm] = useAtom(isVisible)
   const  setUpdateHousingAtom = useSetAtom(updateHousingAtom)

   const handleVisibility = () => {
    setIsShowingForm(!isShowingForm)
  }


const deleteHauberge = async (id: string) => {
  try {
    const response = await axios.delete(`/Hauberge/${id}`)
    if (!response) {
      throw new Error('Error deleting hebergement')
    }
    
    setHebergements(response.data)

  } catch (error) {
    console.error(error)
  }
}

const handleUpdate = (hebergement:HebergementFormData ) => {
  setUpdateHousingAtom(hebergement)
  setIsShowingForm(true)
}



 const {data , isLoading, isError} =  useQuery({ queryKey:['hebergements'], queryFn: fetchHebergements  });
   
useEffect(() => {
  if (data) {
    setHebergements(data)
  }
}, [data,isShowingForm])

if (isLoading) {
  return <Alert severity="info">Loading...</Alert>
}
if (isError) {
  return <Alert severity="error">Error fetching data</Alert>
}

const filteredHebergements = hebergements.filter((h: Hebergement) => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || 
    h.type.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    h.address.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) 
  return (
    <div className="space-y-6">
      
      {isShowingForm ?
      <AddHebergementForm /> : 
      
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
            <Button onClick={handleVisibility}>Ajouter un Hébergement</Button>
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
              { filteredHebergements && filteredHebergements.map((hebergement) => (
                <TableRow key={hebergement._id + v4()}>
                  <TableCell>{hebergement.name}</TableCell>
                  <TableCell>{hebergement.type}</TableCell>
                  <TableCell>{hebergement.capacity}</TableCell>
                  <TableCell>{hebergement.address}</TableCell>
                  <TableCell>{hebergement.availability ? 'Disponible' : 'Non disponible'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={()=> handleUpdate(hebergement)}>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteHauberge(hebergement._id)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
}
    </div>
  )
}