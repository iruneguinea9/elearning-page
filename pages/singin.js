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
        scope: "read:courses me items items",
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
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

  return (
    <>
    <header className="bg-blue-300">
      <div className="xl:container xl:mx-auto flex flex-col items-center  sm:justify-between text-center py-3">
              <Link href={"/"}>
                  <h1 className="font-bold text-4xl">eLearning platform</h1>
              </Link>          
      </div>  
      </header>
      <div className={styles.container} style={{ minHeight: "450px" }}>
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