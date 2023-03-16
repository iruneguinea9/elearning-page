// Name : _apps
// Author : Irune Guinea
// This is to be able to run the app and have the necessary imports
// Last update 16/03/2023 - V1


// ########################################## IMPORTS ##########################################
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function App({ Component, pageProps }) {
    // ########################################## RETURN ##########################################
  return <Component {...pageProps} />
}

export default App