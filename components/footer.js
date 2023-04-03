// Name : Footer
// Author : Irune Guinea
// This component is to mantain a uniform format in all the pages
// Last update 03/04/2023 - V2

export default function footer() {

  const bg = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "bottom left"
  }
  // ########################################## RETURN ##########################################
  return (
    <footer className="bg-blue-400" style={bg}>
      <div class="py-20 bg-gray-900 radius-for-skewed">
        <div class="max-w-md mx-auto text-center">
          <p class="inline-block mb-6 mx-auto text-white text-3xl font-bold leading-none">
            Here would be the logo
          </p>
          <p class="mb-6 text-sm font-semibold text-gray-400">© 2023. All rights reserved.</p>

        </div>
      </div>
    </footer>
  )
}
