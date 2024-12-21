"use client"
import axios from "@/api/auth"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation"
import {Eye,EyeOff} from "lucide-react"



const formSchema = z.object({
  userName: z.string().min(1, "Username is required").max(50),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50),
})

export default function Page() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },  
  })

  const [isMatch, setIsMatch] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    const { push } = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
  axios.post(`/auth/admin/login`,values)
    .then(response => {
      if(response.data){
        push('/dashboard');
      }
})

    .catch(error => {
    const message = error.response?.data?.message || 'An error occurred';
    setIsMatch(message);
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-1/2  ">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg ">
        <h2 className="text-3xl font-bold mb-8 text-center">Sign In</h2>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-6">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="UserName"
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
                    <Button
                    type="button"
                    onClick={() => {
                      setShowPassword(!showPassword);
                      const passwordInput = document.querySelector('input[name="password"]');
                      if (passwordInput) {
                      (passwordInput as HTMLInputElement).type = (passwordInput as HTMLInputElement).type === "password" ? "text" : "password";
                      }
                    }}
                    className="absolute inset-y-0 right-0 px-4 py-2 bg-transparent hover:opacity-85"
                    >
                      { !showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                   </Button>
                  </div>
                  </FormControl>  
                  <FormMessage />
                </FormItem>
                )}
              />
                <FormLabel className="text-center mt-4">
                  Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Sign Up</Link>
                </FormLabel>
                {isMatch && <Alert severity="error" className='duration-100'>{isMatch}</Alert>}
            <Button type="submit" className="w-full bg-black text-white py-4 rounded-md hover:opacity-85">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}