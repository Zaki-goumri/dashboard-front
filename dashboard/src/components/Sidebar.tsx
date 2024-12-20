import { Home, Hotel, Users, AlertTriangle, Calendar } from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Hébergements', href: '/dashboard/hebergements', icon: Hotel },
  { name: 'Résidents', href: '/dashboard/residents', icon: Users },
  { name: 'Réservations', href: '/dashboard/reservations', icon: Calendar },
  { name: 'Liste Noire', href: '/dashboard/blacklist', icon: AlertTriangle },
]

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center mb-5">
        <h2 className="text-2xl font-semibold">Boumerdes Dashboard</h2>
      </div>
      <nav>
        {sidebarItems.map((item) => (
          <Link key={item.name} href={item.href} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <item.icon className="inline-block mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

