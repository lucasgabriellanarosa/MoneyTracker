import { Outlet } from 'react-router'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'

function Layout() {
  return (
    <div className='font-inter min-h-screen flex flex-col'>
        <Header />
        <main className='pb-16'>
          <Outlet />
        </main>
        <Navbar />
    </div>
    
  )
}

export default Layout

