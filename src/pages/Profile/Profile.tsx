import { supabase } from "../../../supabaseClient"

function Profile() {

  const signOut = async () => {
    const {error} = await supabase.auth.signOut()
  }

  return (
    <div className="py-4 px-2">
      <button className="border border-red-600 bg-red-500/80 text-white uppercase px-8 py-1 text-sm rounded-sm"
      onClick={() => signOut()}
      >Sair</button>
    </div>
  )
}

export default Profile