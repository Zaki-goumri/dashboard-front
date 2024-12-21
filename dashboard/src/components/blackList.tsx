"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import { Alert } from '@mui/material'
import AddBlackList from './blackListForm'
import { useAtom } from 'jotai'
import { isVisible } from '@/lib/atom'

interface userInfo{
    _id:string,
    FirstName:string,
    LastName:string,
    DateOfBirth:Date,
    PlaceofBirth:string,
    cardId:string,
}


interface Blacklist {
    DateofBirth: string | number | Date
    _id: string,
    userId: string,
    Reason: string
    userIdObject: string,
    UserInfo: userInfo[]

 
}




const fetchBlackList = async () => {
    const response = await axios.get('/Blacklist')
    console.log(response.data)
    return response.data
  }

export default function BlacklistPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [blacklistData, setBlacklistData] = useState<Blacklist[]>([])
  const [isShowing, setIsShowingForm] = useAtom(isVisible);
  const [error, setError] = useState('')
  const {data , isLoading, isError} =  useQuery({ queryKey:['black List'], queryFn: fetchBlackList });
    
 useEffect(() => {
   if (data) {
     setBlacklistData(data)
     }
 }, [data])
 
 if (isLoading) {
   return <Alert severity="info">Loading...</Alert>
 }
 if (isError) {
   return <Alert severity="error">Error fetching data</Alert>
 }

 const handleVisible = () => {
   setIsShowingForm(!isShowing)
  }


const deleteBlackListed = async (id: string) => {
  try {
    const response = await axios.delete(`/blacklist/${id}`)
    setBlacklistData(response.data)
  } catch (err) {
    console.log(err)
    setError(err instanceof Error ? err.message : 'An error occurred')
    
  }
}

if (!blacklistData) {
  return <Alert severity="info">No data available</Alert>
}
  
const filteredBlacklist = Array.isArray(blacklistData) ? blacklistData.filter(person =>
    person._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person?.UserInfo[0]?.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person?.UserInfo[0]?.LastName.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

  return (
    <div className="space-y-6">
      {error &&
          <Alert severity="error">{error}</Alert>
      }

      {isShowing ? <AddBlackList /> :
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
            <Button onClick={handleVisible}>Ajouter à la Liste Noire</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Numéro de Carte d&apos;Identité</TableHead>
                <TableHead>Raison</TableHead>
                <TableHead>Date de Naissance</TableHead>
                <TableHead>Lieu de Naissance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { filteredBlacklist && filteredBlacklist.map((person) => (
                <TableRow key={person._id}>
                  <TableCell>{person.UserInfo[0].FirstName}</TableCell>
                  <TableCell>{person.UserInfo[0].LastName}</TableCell>
                  <TableCell>{person.userId}</TableCell>
                    <TableCell>{person.Reason}</TableCell>
                    <TableCell>{new Date(person.UserInfo[0].DateOfBirth).toLocaleDateString()}</TableCell>
                    <TableCell>{person.UserInfo[0].PlaceofBirth}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={()=>deleteBlackListed(person.userId  )}>Retirer de la Liste Noire</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
}
    </div>
  )}
