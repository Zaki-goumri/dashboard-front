"use client";"use Strict"
import { Card } from '@/components/ui/card'
import { HousingChart } from '@/components/HousingChart'
import { ReservationChart } from '@/components/ReservationChart'
import { OccupancyChart } from '@/components/OccupancyChart'
import { useEffect, useState } from 'react'
import axios from '@/api/auth'
import { useSetAtom } from 'jotai'
import { housingAtom } from '@/lib/atom'


interface Idata {
  name: string
  value: number
   occupancy: number
}

const data: Idata[] = [
  {name:"maison", value: 0,occupancy:0},{name:"camp",value:0,occupancy:0},{name:"Hotel",value:0,occupancy:0}
]


export default function DashboardPage() {

  const setHousingData = useSetAtom(housingAtom)
  const fetchData = async () => {
    try {
      const totalHousing = await axios.get('/Hauberge')
        for (const housing of totalHousing.data) {
          if (housing.type === "maison") {
            data[0].value++;
            data[0].occupancy += housing.capacity;
          } else {
            data[1].value++;
            data[1].occupancy += housing.capacity;

          }
        }
        setHousingData(data)

      let totalCapacity = 0;
      for (const housing of totalHousing.data) {
        totalCapacity += housing.capacity
      }
      const reservations = await axios.get("/reservations")
      let totalActiveReservations = 0;
      for (const reservation of reservations.data) {
        if (reservation.status !== "terminé") {
          totalActiveReservations++
        }
      }
      const blacklistResponse = await axios.get("blacklist")
      setGeneralData(prevState => ({
        ...prevState,
        totalHousing: totalHousing.data.length,
        totalCapacity,
        activeReservations: totalActiveReservations,
        blacklistedPeople: blacklistResponse.data.length
      }))
    } catch (error) {
      console.error(error)
    }
  }

    const [generalData, setGeneralData] = useState({
      totalHousing: 0,
      totalCapacity: 0,
      activeReservations: 0,
      blacklistedPeople: 0,
    })

    useEffect(() => {
      fetchData()
    }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vue d&apos;ensemble</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Total Hébergements</h3>
          <p className="text-3xl font-bold">{generalData.totalHousing}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Capacité Totale</h3>
          <p className="text-3xl font-bold">{generalData.totalCapacity}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Réservations Actives</h3>
          <p className="text-3xl font-bold">{generalData.activeReservations}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Personnes sur Liste Noire</h3>
          <p className="text-3xl font-bold">{generalData.blacklistedPeople}</p>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4 col-span-2">
          <h3 className="font-semibold mb-4">Répartition des Types d&apos;Hébergement</h3>
          <HousingChart  />
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Réservations Mensuelles</h3>
          <ReservationChart />
        </Card>
      </div>
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Taux d&apos;Occupation par Type d&apos;Hébergement</h3>
        <OccupancyChart />
      </Card>
    </div>
  )
}

