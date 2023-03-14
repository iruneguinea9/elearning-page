import Link from 'next/link'

export default function footer() {

  const bg = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "bottom left"
  }

  return (
    <footer className="bg-blue-400" style={bg}>
      <div className="container mx-auto flex justify-center py-12">
          <div className="py-5">
              <p className="py-5 text-white">Copyright ©2023 All rights reserved | This is a test for the component</p>
          </div>
      </div>

    </footer>
  )
}
