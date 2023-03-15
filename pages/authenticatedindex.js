import utilStyles from '../styles/utils.module.css'
import Head from "next/head"
import Format from '../layout/format';
import Courses from '../components/courses';

export default function AuthenticatedFormat(props) {
  return (
    <> <Format>
            <Head>
                <title>eLearning</title>
            </Head>
         <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
         <div> <h2 className={utilStyles.headingLg} style={{ fontSize: "28px", marginLeft: "20px" }}>Courses</h2></div>
          <Courses/>
        </section>
        </Format>
        </>
  )
}