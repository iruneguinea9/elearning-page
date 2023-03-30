// Name : Sign in
// Author : Irune Guinea
// This is where the credentials are set, it redirects to the authenticated index
// Last update 30/03/2023 - V4


// ########################################## IMPORTS ##########################################
import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "../components/footer"
import Link from 'next/link'
import { setCookie } from "nookies"

export default function SignIn() {
  const router = useRouter()

  const [state, setState] = useState({
    grant_type: "password",
        username:"",
        password: "",
        scope: "read:courses me items items",  //the scope for the api
        client_id: "",
        client_secret: ""
  })

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    const credentials = {
       grant_type: "password",
        username: state.username,
        password: state.password,
        scope: "read:courses me items items",
        client_id: "",
        client_secret: ""
      };
      const formData = new URLSearchParams(credentials);
      // ########################################## FETCHING ##########################################
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",  //API established
        "Accept": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      setCookie(null, "token", json.access_token, {
        maxAge: json.expires_in,
        path: "/",
      })
      router.push("/authenticatedindex")
    } else {
      alert("Could not login, please check the username and the password")
    }
  }
  // ########################################## RETURN ##########################################
  return (
    <>
      <header className="bg-blue-300 relative">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mx-auto">
            <Link href="/">
              <h1 className="font-bold text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center cursor-pointer">eLearning platform</h1>
            </Link>
          </div> 
        </div>
      </header>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
          <div className="flex flex-col space-y-4" >
            <input className="border border-gray-300 px-3 py-2 rounded-lg" type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} autoComplete="off" />
            <input className="border border-gray-300 px-3 py-2 rounded-lg"  type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg py-2 w-full" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}