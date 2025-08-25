import { FaWallet } from "react-icons/fa"
import { NavLink } from "react-router"
import { useUserData } from "../../hooks/useUserData"

function Header() {

  const { user, loading } = useUserData()

  console.log(user)

  if (loading) return <p>Carregando...</p>
  if (!user) return <p>Nenhum usuário logado.</p>

  return (
    <header className="flex flex-row justify-between items-center p-2 border-b border-gray-200">
      <div className="flex justify-center items-center gap-2">
        <FaWallet />

        <h1>MoneyTracker</h1>
      </div>

      <NavLink to={'/profile'}>
        {
          user?.user_metadata?.avatar_url &&
          (
            <img className="w-12 rounded-full" src={user?.user_metadata?.avatar_url} referrerPolicy="no-referrer"/>
          )
        }

      </NavLink>
    </header>
  )
}

export default Header