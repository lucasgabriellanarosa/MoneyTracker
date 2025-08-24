import { supabase } from "../../../supabaseClient"

function GoogleBtn() {

    async function signInWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return (
        <button className="px-4 py-2 bg-white w-fit self-center border flex gap-2 border-slate-200 rounded-lg text-slate-700" onClick={() => signInWithGoogle()}>
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Entrar com Google</span>
        </button>
    )
}

export default GoogleBtn