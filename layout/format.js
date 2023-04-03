// Name : Format
// Author : Irune Guinea
// This is aimed at maintaining a uniform format of all the pages
// Last update 03/04/2023 - V7

// ########################################## IMPORTS ##########################################
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function Format({ children}) {
  // ########################################## RETURN ##########################################
  return (
    <div class="bg-gray-900">
      <Head>
        <title>eLearning</title>
      </Head>
      <Header/>
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
}