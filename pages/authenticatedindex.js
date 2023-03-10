import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Format from '../layout/format';

export default function AuthenticatedFormat(props) {
  const [profile, setProfile] = useState()
  const router = useRouter()


  function logout() {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <> <Format>
            <Head>
                <title>eLearning</title>
            </Head>

         <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Courses</h2>
        </section>
        </Format>
        </>
  )
}