import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Navbar } from '@/components/Navbar'


export default   function HomePage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl flex flex-col items-center">
          <Image src="/logo.svg" alt="logo" width={300} height={300}  className='mb-6'/>

            <span className="block">Bienvenue sur le Dashboard</span>
            <span className="block text-indigo-600">de Boumerdes</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gérez efficacement les hébergements, les résidents et les réservations pour l&apos;état de Boumerdes.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button asChild className="w-full">
                <Link href="/login">
                  Accéder au Dashboard
                </Link>
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
