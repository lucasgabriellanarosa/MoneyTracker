import React, { useEffect, useState } from "react"
import { FaBook, FaEdit, FaGamepad, FaPlus } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { FaUtensils, FaBus, FaShoppingCart, FaHeartbeat } from "react-icons/fa";
import { supabase } from "../../../supabaseClient";
import { useUserData } from "../../hooks/useUserData";
import useGetCategories from "../../hooks/useGetCategories";
import * as FaIcons from "react-icons/fa";
import { Dialog } from "@headlessui/react";

function Categories() {
  const handleIsAddCategoryOpen = () => {
    setIsAddCategoryModalOpen(!isAddCategoryModalOpen)
  }

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)

  const [categoryName, setCategoryName] = useState("")
  const [categoryType, setCategoryType] = useState("gasto")

  const [selectedColor, setSelectedColor] = useState('red')
  const colors = {
    red: { bg: 'bg-red-200', text: 'text-red-700' },
    orange: { bg: 'bg-orange-200', text: 'text-orange-700' },
    yellow: { bg: 'bg-yellow-200', text: 'text-yellow-700' },
    green: { bg: 'bg-green-200', text: 'text-green-700' },
    teal: { bg: 'bg-teal-200', text: 'text-teal-700' },
    blue: { bg: 'bg-blue-200', text: 'text-blue-700' },
    purple: { bg: 'bg-purple-200', text: 'text-purple-700' },
    pink: { bg: 'bg-pink-200', text: 'text-pink-700' },
  };

  const [selectedIcon, setSelectedIcon] = useState("FaUtensils");

  const { user } = useUserData()

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!user) {
      console.error("Usuário não logado")
      return
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name: categoryName,
          user_id: user.id,
          color: selectedColor,
          type: categoryType,
          icon: selectedIcon,
        },
      ])

    if (error) {
      console.error("Erro ao inserir categoria:", error.message)
    } else {
      handleIsAddCategoryOpen()
      setCategoryName('')
      setCategoryType('')
      setSelectedColor('red')
      setSelectedIcon('food')
    }
  }

  const { categories, loading, error } = useGetCategories();

  const [userCategories, setUserCategories] = useState(categories)

  useEffect(() => {
    setUserCategories(categories)
  }, [categories])

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const icons = Object.entries(FaIcons);

  const filteredIcons = icons.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const onIconSelect = (icon: React.ElementType) => {
    setSelectedIcon(icon);
  };

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

            <form className='flex flex-col gap-4' onSubmit={(e) => handleAddCategory(e)}>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Nome</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="text" className='w-full outline-0' placeholder='Ex: Salário, Alimentação...' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Tipo</label>
                <select className='flex flex-row border border-gray-300 p-2 rounded-md gap-1' value={categoryType} onChange={e => setCategoryType(e.target.value)}>
                  <option value="gasto">Gasto</option>
                  <option value="receita">Receita</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Cor</label>
                <div className="grid grid-cols-4 gap-4 w-fit">
                  {Object.keys(colors).map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === color
                        ? 'border-black scale-110'
                        : 'border-gray-300'
                        } ${colors[color].bg}`}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Selecionar Ícone</label>
                <div className="grid grid-cols-6 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`flex flex-row items-center justify-center w-fit gap-2 px-4 py-2 border rounded-md ${colors[selectedColor].text} ${colors[selectedColor].bg}`}
                  >
                    <span className="text-lg">
                      {
                        FaIcons[selectedIcon] &&
                        React.createElement(FaIcons[selectedIcon])
                      }
                    </span>
                  </button>

                  <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-h-[80vh] flex flex-col gap-2">
                        <span className="flex flex-row justify-between items-center text-sm">
                          <h2 className="font-semibold">Escolha um ícone</h2>

                          <button className="text-base" onClick={() => setIsOpen(false)}>
                            <MdClose />
                          </button>

                        </span>

                        <input
                          type="text"
                          placeholder="Buscar ícone..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 mb-4 text-sm"
                        />

                        <div className="grid grid-cols-7 gap-3 overflow-y-auto">
                          {filteredIcons.map(([name, Icon]) => (
                            <button
                              key={name}
                              type="button"
                              title={name}
                              onClick={() => {
                                onIconSelect(name);
                                setIsOpen(false);
                              }}
                              className={`p-2 text-xl border rounded-md hover:bg-gray-100 transition flex items-center justify-center w-fit ${colors[selectedColor].text} ${colors[selectedColor].bg}`}
                            >
                              <Icon />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Dialog>

                </div>
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
            {
              userCategories > [] &&
              userCategories.filter(cat => cat.type == 'gasto').map((cat) => (
                <li className="flex flex-row items-center justify-between border border-gray-300 rounded-md px-4 py-2 shadow-xs" key={cat.id}>

                  <div className="flex flex-row items-center justify-center gap-2">

                    <div className={`${colors[cat.color].bg} ${colors[cat.color].text} p-2 rounded-full`}>
                      {FaIcons[cat.icon] && React.createElement(FaIcons[cat.icon])}
                    </div>

                    <div className="text-base">
                      <h3 className="font-semibold">{cat.name}</h3>
                      <span className="text-sm text-gray-500">12 transações este mês</span>
                    </div>

                  </div>

                  <button className="text-gray-700">
                    <FaEdit />
                  </button>

                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-gray-600 uppercase">Categorias de Receitas</h2>

          <ul className="flex flex-col text-xl gap-3">
            {
              userCategories > [] &&
              userCategories.filter(cat => cat.type == 'receita').map((cat) => (
                <li className="flex flex-row items-center justify-between border border-gray-300 rounded-md px-4 py-2 shadow-xs" key={cat.id}>

                  <div className="flex flex-row items-center justify-center gap-2">

                    <div className={`${colors[cat.color].bg} ${colors[cat.color].text} p-2 rounded-full`}>
                      {FaIcons[cat.icon] && React.createElement(FaIcons[cat.icon])}
                    </div>

                    <div className="text-base">
                      <h3 className="font-semibold">{cat.name}</h3>
                      <span className="text-sm text-gray-500">12 transações este mês</span>
                    </div>

                  </div>

                  <button className="text-gray-700">
                    <FaEdit />
                  </button>

                </li>
              ))}
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

      </section >

    </>
  )
}

export default Categories