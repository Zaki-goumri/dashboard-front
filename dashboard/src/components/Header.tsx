"use client"
import { Bell, User } from 'lucide-react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
        <Image src="/logo.svg" alt="logo" width={100} height={100}  className='ml-10'/>
        </h1>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <Bell className="h-6 w-6" />
          </button>
          <section className="flex items-center  space-x-2 p-1 rounded-full hover:bg-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button  className="relative h-8 w-8 flex justify-center items-center rounded-full">
                <User className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>            
          </section>
        </div>
      </div>
    </header>
  )
}

