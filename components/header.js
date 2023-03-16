// Name : Header
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 16/03/2023 - V1

// ########################################## IMPORTS ##########################################
import Link from 'next/link'

export default function header() {

    // ########################################## RETURN ##########################################
  return (
    <header className="bg-blue-300">
        <div className="xl:container xl:mx-auto flex flex-col items-center  sm:justify-between text-center py-3">
                <Link href={"/authenticatedindex"}>
                    <h1 className="font-bold text-4xl">eLearning platform</h1>
                </Link>
        </div>        
    </header>
  )
}
