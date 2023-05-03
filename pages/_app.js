// Name : _apps
// Author : Irune Guinea
// This is to be able to run the app and have the necessary imports
// Last update 16/03/2023 - V1


// ########################################## IMPORTS ##########################################
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import Layout from '../components/layout/layout'
import { UserDataProvider } from "../src/DataContext.jsx";

function App({ Component, pageProps }) {
  // ########################################## RETURN ##########################################
  return (
    <UserDataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserDataProvider>
  )
}

export default App