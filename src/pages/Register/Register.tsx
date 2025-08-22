import { FaLock, FaWallet } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { Link } from "react-router"
import GoogleBtn from "../../components/GoogleBtn/GoogleBtn"

function Register() {
    return (
        <div className="bg-neutral-800 min-h-screen text-white px-2 py-8 flex flex-col gap-8">
            <header className="text-sm w-full flex justify-end">
                <span className="text-neutral-400">Já tem uma conta? <Link to={"/login"} className="text-white">Faça login</Link></span>
            </header>

            <main className="flex flex-col gap-4">

                <div className="bg-white text-neutral-800 self-center text-2xl p-4 rounded-md">
                    <FaWallet />
                </div>

                <h1 className="text-lg font-semibold self-center">MoneyTracker</h1>

                <p className="text-center text-neutral-400 text-sm">Controle suas finanças de forma simples e inteligente</p>

                <form className="bg-neutral-700 px-4 py-8 rounded-xl border border-neutral-500 flex flex-col gap-3">

                    <h2 className="text-center text-lg font-semibold">Crie sua conta</h2>

                    <div className="flex flex-col gap-1">

                        <label className="text-gray-200 text-sm">Email</label>

                        <div className="border w-full bg-neutral-600 border-neutral-500 flex flex-row items-center text-base p-2 gap-2 text-gray-300">
                            <div>
                                <MdEmail />
                            </div>
                            <input type="text" placeholder="seuemail@email.com" className="text-sm w-full outline-hidden" />
                        </div>

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="text-gray-200 text-sm">Senha</label>

                        <div className="border w-full bg-neutral-600 border-neutral-500 flex flex-row items-center p-2 gap-2 text-gray-300">
                            <div>
                                <FaLock />
                            </div>
                            <input type="password" placeholder="********" className="text-sm w-full outline-hidden" />
                        </div>

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="text-gray-200 text-sm">Confirmar Senha</label>

                        <div className="border w-full bg-neutral-600 border-neutral-500 flex flex-row items-center p-2 gap-2 text-gray-300">
                            <div>
                                <FaLock />
                            </div>
                            <input type="password" placeholder="********" className="text-sm w-full outline-hidden" />
                        </div>

                    </div>


                    <button className="uppercase bg-white text-black font-semibold w-fit px-4 py-2 rounded-md self-center">Entrar</button>

                </form>

                <p className="text-center text-neutral-400 text-sm">ou crie sua conta com</p>

                <GoogleBtn />

            </main>
        </div>
    )
}

export default Register