import { Bell, User } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Boumerdes State Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <Bell className="h-6 w-6" />
          </button>
          <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-200">
            <User className="h-6 w-6" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

