// Name : Sign in
// Author : Irune Guinea
// This is where the credentials are set, it redirects to the authenticated index
// Last update 11/04/2023 - V9


// ########################################## IMPORTS ##########################################
import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "../components/footer"
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
// ########################################## HANDLING ##########################################
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
    <div className="relative bg-gray-900 overflow-hidden">
      <header className="shadow-lg">
          <nav className="relative px-6 py-6 flex justify-between items-center">
            <a className="text-white text-3xl font-bold leading-none" href="/">
              <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center cursor-pointer hover:scale-105 transition duration-300">eLearning platform</h1>
            </a>            
          </nav>
        </header>
      <div className="min-h-screen flex items-center justify-center p-6 lg:p-12 mb-6 shadow-md rounded-2xl">
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-5">Sign In</h1>
          <div className="flex flex-col space-y-4" >
            <input className="border border-gray-300 px-3 py-2 rounded-lg" type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} autoComplete="off" />
            <input className="border border-gray-300 px-3 py-2 rounded-lg"  type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold mt-0.5 rounded-lg py-2 w-full" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}