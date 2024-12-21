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
import { useAtom, useSetAtom } from 'jotai'
import { isVisible, updateEmpolyeeAtom } from '@/lib/atom'
import EmployeeForm from './employeeForm'


interface employees {
  _id: string
  FirstName:string,
  LastName:string,
  DateOfBirth:Date,
  PlaceofBirth:string,
  Rank:string,
  Job:string,
    
}

const fetchEmployees = async () => {
  const response = await axios.get('/employees')
  return response.data
}

export default function EmployantPage() {

   const [searchTerm, setSearchTerm] = useState('')
   const [employees, setEmployees] = useState<employees[]>([])
   const [error, setError] = useState('')
   const [isShowing, setIsShowingForm] = useAtom(isVisible);
  const setUpdateEmployee= useSetAtom(updateEmpolyeeAtom)


 const {data , isLoading, isError} =  useQuery({ queryKey:['employees'], queryFn: fetchEmployees   });
   
useEffect(() => {
  if (data) {
    setEmployees(data)
  }
}, [data,isShowing])

if (isLoading) {
  return <Alert severity="info">Loading...</Alert>
}
if (isError) {
  return <Alert severity="error">Error fetching data</Alert>
} 


const handleVisibility = () => {
  setIsShowingForm(!isShowing);
}


const handleUpdate = (employee:employees ) => {
  setUpdateEmployee(employee)
  setIsShowingForm(true)
}



const deleteEmployees = async (id: string) => {
  try {
    const response = await axios.delete(`/employees/${id}`)
    console.log(response.data)
    setEmployees(response.data)
  } catch (err) {
    console.log(err)
    setError(err instanceof Error ? err.message : 'An error occurred')
  }
}


const filteredEmployees = Array.isArray(employees)  ? employees.filter((h: employees) => 
    h.FirstName.toLowerCase().includes(searchTerm.toLowerCase().trim()) || 
    h.LastName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    h.Job.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) : []
  return (
    <div className="space-y-6">
      {error &&
          <Alert severity="error">{error}</Alert>
      }

      {isShowing ? <EmployeeForm /> :(
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
                <TableHead>Prenom</TableHead>
                <TableHead>Date de Naissance</TableHead>
                <TableHead>Lieux de Naissance</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Travail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { filteredEmployees && filteredEmployees.map((employee) => (
                <TableRow key={employee._id + v4()}>
                  <TableCell>{employee.FirstName}</TableCell>
                  <TableCell>{employee.LastName}</TableCell>
                  <TableCell>{new Date(employee.DateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{employee.PlaceofBirth}</TableCell>
                  <TableCell>{employee.Rank }</TableCell>
                  <TableCell>{employee.Job}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={()=> handleUpdate(employee)}>Modifier</Button>
                    <Button variant="destructive" size="sm" onClick={()=>deleteEmployees(employee._id)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}
    </div>
  )
}

