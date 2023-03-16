// Name : Format
// Author : Irune Guinea
// This is aimed at mantaining a uniform format of all the pages
// Last update 16/03/2023 - V1

// ########################################## IMPORTS ##########################################
import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"

export default function format( { children },{title}){


      // ########################################## RETURN ##########################################
    return (
        <>
            <Head>
                <title>eLearning</title>
            </Head>
            <Header></Header>
            <main style={{ minHeight: "450px" }}>{children}</main>
            <Footer></Footer>
        </>
    )
}