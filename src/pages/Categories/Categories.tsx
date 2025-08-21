import { FaEdit } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5"

function Categories() {
  return (
    <>
      <aside className='flex flex-col justify-center items-center gap-2 bg-gray-50 shadow-sm py-4 px-2'>
        <h2 className="w-full uppercase text-sm text-gray-700">Período</h2>
        <ul className="w-full flex flex-row gap-2 text-sm">
          <li>
            <button className="bg-black text-white py-1 px-2 rounded-md">Este Mês</button>
          </li>
          <li>
            <button className="py-1 px-2 bg-white border border-gray-300 rounded-md">Este Ano</button>
          </li>
          <li>
            <button className="py-1 px-2 bg-white border border-gray-300 rounded-md">Todo Período</button>
          </li>
        </ul>
      </aside>

      <section className="px-2 py-4 flex flex-col gap-4">
        <h2 className="text-gray-600 uppercase">Categorias de Gastos</h2>

        <ul className="flex flex-col text-xl gap-3">
          <li className="flex flex-row items-center justify-between border border-gray-300 rounded-md px-4 py-2 shadow-xs">

            <div className="flex flex-row items-center justify-center gap-2">

              <div className="bg-yellow-200 text-yellow-700 p-2 rounded-full">
                <IoFastFood />
              </div>

              <div className="text-base">
                <h3 className="font-semibold">Alimentação</h3>
                <span className="text-sm text-gray-500">12 transações este mês</span>
              </div>

            </div>

            <button className="text-gray-700">
              <FaEdit />
            </button>

          </li>
          <li className="flex flex-row items-center justify-between border border-gray-300 rounded-md px-4 py-2 shadow-xs">

            <div className="flex flex-row items-center justify-center gap-2">

              <div className="bg-blue-200 text-blue-700 p-2 rounded-full">
                <IoFastFood />
              </div>

              <div className="text-base">
                <h3 className="font-semibold">Alimentação</h3>
                <span className="text-sm text-gray-500">12 transações este mês</span>
              </div>

            </div>

            <button className="text-gray-700">
              <FaEdit />
            </button>

          </li>
        </ul>
      </section>

    </>
  )
}

export default Categories