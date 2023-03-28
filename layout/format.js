// Name : Format
// Author : Irune Guinea
// This is aimed at maintaining a uniform format of all the pages
// Last update 28/03/2023 - V6

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
      <main style={{ minHeight: "90vh" }}>{children}</main>
      <Footer />
    </>
  );
}