import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/styles.module.css'

export default function AuthenticatedFormat(props) {
  const [profile, setProfile] = useState()
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (res.ok) {
      const json = await res.json()
      setProfile(json)
    } else {
      router.push("/signin")
    }
  }

  function logout() {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <>
            <Head>
                <title>eLearning</title>
            </Head>

            <Header></Header>
            <main><section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Courses</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, description, title }) => (
              <li className={utilStyles.listItem} key={id}>
              <Link href={`/courses/${id}`}>{title}
              <br />
              <small className={utilStyles.lightText}>
              <h4 className={utilStyles.listItem}>{description}</h4>
              </small></Link>
            </li>
            ))}
          </ul>
        </section></main>
            <Footer></Footer>
        </>
  )
}