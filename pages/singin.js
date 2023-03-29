// Name : Sign in
// Author : Irune Guinea
// This is where the credentials are set, it redirects to the authenticated index
// Last update 29/03/2023 - V3


// ########################################## IMPORTS ##########################################
import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "../components/footer"
import styles from "../styles/styles.module.css"
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
      <div className={styles.container} style={{ minHeight: "90vh" }}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.form} >
          <input className={styles.input} type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} autoComplete="off" />
          <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
          <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}