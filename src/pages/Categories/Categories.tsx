import { useState } from "react"
import { FaEdit, FaPlus } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5"
import { MdClose } from "react-icons/md"

function Categories() {

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)

  const handleIsAddCategoryOpen = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen)
  }

  return (
    <>
      <aside className='flex flex-col justify-center items-center gap-2 bg-gray-50 shadow-sm py-4 px-2'>
        <h2 className="w-full uppercase text-sm text-gray-700">Categorias</h2>
        <ul className="w-full flex flex-row gap-2 text-sm">
          <li>
            <button className="bg-neutral-900 text-white py-1 px-2 rounded-md">Todas</button>
          </li>
          <li>
            <button className="py-1 px-2 bg-white border border-gray-300 rounded-md">Gastos</button>
          </li>
          <li>
            <button className="py-1 px-2 bg-white border border-gray-300 rounded-md">Receitas</button>
          </li>
        </ul>
      </aside>

      {
        isAddCategoryModalOpen &&
        <section className='fixed inset-0 overflow-hidden h-screen w-full bg-black/50 z-50 px-1 flex justify-center items-end'>

          <div className='bg-white w-full px-4 py-6 rounded-t-lg flex flex-col gap-4'>

            <div className='flex flex-row justify-between items-center'>
              <h2 className='font-semibold'>Nova Categoria</h2>

              <span className='text-lg'
                onClick={() => handleIsAddCategoryOpen()}
              >
                <MdClose />
              </span>
            </div>

            <form className='flex flex-col gap-4'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Nome</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="text" className='w-full outline-0' placeholder='Ex: Salário, Alimentação...' />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Tipo</label>
                <select className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <option value="salario" selected>Gasto</option>
                  <option value="freelance">Receita</option>
                </select>
              </div>

              <button className='bg-neutral-900 text-white font-semibold py-2 rounded-md'>
                Adicionar Categoria
              </button>

            </form>

          </div>


        </section>
      }

      <section className="px-2 py-4 flex flex-col gap-6">

        <div className="flex flex-col gap-3">
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
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-gray-600 uppercase">Categorias de Receitas</h2>

          <ul className="flex flex-col text-xl gap-3">
            <li className="flex flex-row items-center justify-between border border-gray-300 rounded-md px-4 py-2 shadow-xs">

              <div className="flex flex-row items-center justify-center gap-2">

                <div className="bg-pink-200 text-pink-700 p-2 rounded-full">
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

                <div className="bg-emerald-200 text-emerald-700 p-2 rounded-full">
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
        </div>

        <button className="bg-neutral-900 text-white flex flex-row justify-center items-center gap-2 text-sm w-fit self-center py-3 px-12 rounded-sm"
          onClick={() => handleIsAddCategoryOpen()}
        >
          <span>
            <FaPlus />
          </span>
          Criar nova categoria
        </button>

      </section>

    </>
  )
}

export default Categories