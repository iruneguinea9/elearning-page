// Name : Format
// Author : Irune Guinea
// This is aimed at maintaining a uniform format of all the pages
// Last update 21/03/2023 - V3

// ########################################## IMPORTS ##########################################
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import { useState } from 'react';

export default function Format({ children , accessToken}) {
  const [token, setToken] = useState(accessToken);
  // ########################################## RETURN ##########################################
  return (
    <>
      <Head>
        <title>eLearning</title>
      </Head>
      <Header accessToken={accessToken} />
      <main style={{ minHeight: "450px" }}>{children}</main>
      <Footer />
    </>
  );
}