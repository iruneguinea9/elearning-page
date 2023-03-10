import { useRouter } from "next/router"
import { useState } from "react"
import Format from "../layout/format"
import styles from "../styles/styles.module.css"

export default function SignIn() {
  const router = useRouter()

  const [state, setState] = useState({
    username: "johndoe",
    password: "secret"
  })

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    const credentials = {
        grant_type: "",
        username: "johndoe",
        password: "secret",
        scope: "",
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
      localStorage.setItem("token", json.token)
      router.push("/courses/course1")
    } else {
      alert("Bad credentials")
    }
  }

  return (
    <Format>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.form}>
          <input className={styles.input} type="text" name="username" placeholder="username" value={state.username} onChange={handleChange} autoComplete="off" />
          <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
          <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Format>
  )
}