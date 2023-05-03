// Name : Footer
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 06/04/2023 - V4

export default function footer() {

  // ########################################## RETURN ##########################################
  return (
    <footer className=" bg-green-600">
        <div className="skew skew-top mr-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-900" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 0 10 10 0 10"></polygon>
        </svg>
      </div>
      <div className="skew skew-top ml-for-radius">
        <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-900" viewBox="0 0 10 10" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="py-20 bg-gray-900 radius-for-skewed">
        <div className="max-w-md mx-auto text-center">
          <p className="inline-block mb-6 mx-auto text-white text-3xl font-bold leading-none">
            Here would be the logo
          </p>
          <p className="mb-6 text-sm font-semibold text-gray-400">© 2023. All rights reserved.</p>

        </div>
      </div>
    </footer>
  )
}
