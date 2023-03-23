// Name : Format
// Author : Irune Guinea
// This is aimed at maintaining a uniform format of all the pages
// Last update 23/03/2023 - V4

// ########################################## IMPORTS ##########################################
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function Format({ children}) {
  // ########################################## RETURN ##########################################
  return (
    <>
      <Head>
        <title>eLearning</title>
      </Head>
      <Header/>
      <main style={{ minHeight: "450px" }}>{children}</main>
      <Footer />
    </>
  );
}