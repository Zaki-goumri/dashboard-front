"use client"
import { useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import { v4 } from 'uuid'


interface Resident {
FirstName:string,
  LastName:string,
  Email:string,
  Password:string,
  Phone:number,
  DateOfBirth:Date,
  PlaceofBirth:string,
  cardId:string,
  Sex: string
  _id:string,
}       

const fetchresidents = async () => {
    const response = await axios.get('/Hauberge/Residents')
    return response.data
  }
  
export default function ResidentsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [residents, setResidents] = useState([])
 
 
  const {data , isLoading, isError} =  useQuery({ queryKey:['residents'], queryFn: fetchresidents });
    
 useEffect(() => {
   if (data) {
     setResidents(data.flat())
     }
 }, [data])
 
 if (isLoading) {
   return <Alert severity="info">Loading...</Alert>
 }
 if (isError) {
   return <Alert severity="error">Error fetching data</Alert>
 }
 const filteredResidents= residents.filter((h: Resident) => 
     h.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     h.LastName?.toLowerCase().includes(searchTerm.toLowerCase())||
     h.cardId?.toString().includes(searchTerm.toLowerCase())
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
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Date de Naissance</TableHead>
                <TableHead>Lieu de Naissance</TableHead>
                <TableHead>Sexe</TableHead>
                <TableHead>Numéro de Carte d&apos;Identité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { filteredResidents &&  filteredResidents.map((resident:Resident) => (
                <TableRow key={resident._id + v4()}>
                  <TableCell>{resident.LastName}</TableCell>
                  <TableCell>{resident.FirstName}</TableCell>
                  <TableCell>{resident.DateOfBirth ? new Date(resident.DateOfBirth).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{resident.PlaceofBirth}</TableCell>
                  <TableCell>{resident.Sex}</TableCell>
                  <TableCell>{resident.cardId}</TableCell>
                  <TableCell>
                    
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
