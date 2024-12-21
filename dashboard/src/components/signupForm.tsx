"use client"
import React from 'react';
import { useState } from "react"
import axios from "@/api/auth"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const formSchema = z.object({
  Username:z.string().min(1, "First name is required").max(50),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50),
    Role: z.enum(["Admin","Super Admin"])
})


export default function Page() {


const [confirmPassword, setConfirmPassword] = useState("");
const [registerationHandling, setRegisterationHandling]= useState("");
const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Username: "",
      password: "",
      Role: "Admin"
    },  
  })

  const checkPassword = (password: string,confirmPassword:string) => {
    return (password == confirmPassword) 
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
   if (!checkPassword(values.password,confirmPassword)){
    setRegisterationHandling("Passwords do not match");
    return;
   }
  axios.post(`/auth/admin/register`, values
  ).then(()=>{
    push(`/dashboard`)
  })
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen w-1/2  ">
      <div  className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg ">
        <h2 className="text-3xl font-bold mb-8 text-center">Sign Up </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
          <FormField
              control={form.control}
              name="Username" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>etablissement</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="le nom de l'etablissement"
                      {...field}
                      className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
              <FormField
                control={form.control}
                name="Role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
     
          {/* <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="camp">Camp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

          

            {/* <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Capacity"
                      {...field}
                      className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="telephone"
              render={({ field }  ) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Telephone"
                      {...field}
                      className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <div className="relative">
                    <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-12"
                    />

                  </div>
                  </FormControl>  
                  <FormMessage />
                </FormItem>
                )}
              />
              
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-12"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>  
                  <FormMessage />
                </FormItem>
             

                              
            <Button type="submit" className="w-full bg-black text-white py-4 rounded-md hover:opacity-85">
              Sign Up
            </Button>
        {registerationHandling && <Alert severity="error" className='duration-100'> {registerationHandling}</Alert>}

            <FormLabel className="text-center block mt-4">
              Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Sign In</Link>
            </FormLabel>

          </form>
        </Form>
      </div>
    </div>
  )
}