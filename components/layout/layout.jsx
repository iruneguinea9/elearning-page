import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="bg-gray-900 pb-16">{children}</main>
      <Footer />
    </>
  )
}