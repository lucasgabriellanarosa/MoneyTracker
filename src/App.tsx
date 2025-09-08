import { FaArrowDown, FaArrowUp, FaChartBar } from 'react-icons/fa'
import './App.css'
import MoneyDetailsContainer from './components/MoneyDetailsContainer/MoneyDetailsContainer'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useRef, useState } from 'react';
import { MdClose, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IoFastFood } from 'react-icons/io5';
import useGetCategories from './hooks/useGetCategories';
import type { Category } from './@types/Category';
import { supabase } from '../supabaseClient';
import { useUserData } from './hooks/useUserData';
import { useGetDailyReports } from './hooks/useGetDailyReports';

function App() {

  // Auth

  const { user } = useUserData()

  // Add expense & add profits
  const [isAddProfitModalOpen, setIsAddProfitModalOpen] = useState(false)
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)

  const { categories } = useGetCategories()

  const [profitCategories, setProfitCategories] = useState<Category[]>([])
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([])

  // New Profit

  const [profitPrice, setProfitPrice] = useState<number>()
  const [profitDescription, setProfitDescription] = useState('')
  const [profitCategory, setProfitCategory] = useState('')
  const [profitDate, setProfitDate] = useState('')

  const handleAddNewProfit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      console.error("Usuário não logado")
      return
    }

    const { error } = await supabase
      .from("daily_reports")
      .insert([
        {
          user_id: user.id,
          price: profitPrice,
          name: profitDescription,
          category_id: profitCategory,
          type: "receita",
          date: profitDate
        },
      ])

    if (error) {
      console.error("Erro ao inserir receita:", error.message)
    } else {
      handleAddProfitModal()
      setProfitPrice(0)
      setProfitDescription('')
      setProfitCategory('')
      setProfitDate('')
    }
  }

  const handleAddProfitModal = () => {
    setIsAddProfitModalOpen(!isAddProfitModalOpen)
  }

  const handleAddExpenseModal = () => {
    setIsAddExpenseModalOpen(!isAddExpenseModalOpen)
  }

  // Dates and calendar
  dayjs.locale('pt-br');
  dayjs.extend(customParseFormat);
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today)
  const carouselRef = useRef<HTMLUListElement>(null);

  const daysInMonth = Array.from(
    { length: selectedDate.daysInMonth() },
    (_, i) => selectedDate.startOf('month').add(i, 'day')
  );

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => prev[direction === 'prev' ? 'subtract' : 'add'](1, 'month'));
  };

  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);
  const yearOptions = Array.from({ length: 7 }, (_, i) => dayjs().year() - 3 + i);


  const { reports } = useGetDailyReports(selectedDate.format("YYYY-MM-DD"))

  useEffect(() => {
    if (carouselRef.current) {
      const selectedDayElement = carouselRef.current.querySelector(
        `[data-day="${selectedDate.format('DD-MM-YYYY')}"]`
      );

      selectedDayElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    setProfitCategories(categories.filter((cat) => cat.type === "receita"))
    setExpenseCategories(categories.filter((cat) => cat.type === "gasto"))


  }, [selectedDate, categories]);

  console.log(reports)

  return (
    <>

      <header className='flex flex-col w-full bg-gray-50'>

        <section className='flex flex-col py-2 px-4'>
          <div className='flex flex-row justify-between'>
            <button className='text-sm'
              onClick={() => setIsYearSelectorOpen(prev => !prev)}
            >
              {selectedDate.format("YYYY")}
            </button>
            {isYearSelectorOpen && (
              <ul className='absolute mt-1 bg-white border border-gray-500 rounded shadow-md z-50 max-h-60 overflow-y-auto'>
                {yearOptions.map((year) => (
                  <li
                    key={year}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${selectedDate.year() === year ? 'bg-gray-300' : ''}`}
                    onClick={() => {
                      setSelectedDate(selectedDate.year(year));
                      setIsYearSelectorOpen(false);
                    }}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className='flex flex-row items-center justify-around text-xl'>
            <span onClick={() => navigateMonth('prev')} className="cursor-pointer">
              <MdNavigateBefore />
            </span>
            <button className='text-base font-bold capitalize w-[100px] text-center'>{selectedDate.format("MMMM")}</button>
            <span onClick={() => navigateMonth('next')} className="cursor-pointer">
              <MdNavigateNext />
            </span>
          </nav>
        </section>

        <ul
          ref={carouselRef}
          className='flex flex-row py-2 gap-4 px-4 overflow-x-auto'
        >
          {daysInMonth.map((day) => (
            <li
              key={day.format('DD-MM-YYYY')}
              data-day={day.format('DD-MM-YYYY')}
              className={`py-1 px-2 rounded-sm cursor-pointer min-w-[2.5rem] text-center ${day.isSame(selectedDate, 'day')
                ? 'bg-slate-700 text-gray-300'
                : 'hover:bg-slate-300'
                }`}
              onClick={() => setSelectedDate(day)}
            >
              {day.format('D')}
            </li>
          ))}
        </ul>

      </header >

      <aside className='flex flex-col justify-center items-center gap-2 bg-gray-50 shadow-sm py-4 px-2'>

        <div className='flex flex-row gap-4 w-full'>
          <MoneyDetailsContainer title={"Receitas"} value={1280}>
            <FaArrowUp />
          </MoneyDetailsContainer>

          <MoneyDetailsContainer title={"Gastos"} value={445}>
            <FaArrowDown />
          </MoneyDetailsContainer>

        </div>

        <MoneyDetailsContainer title={"Saldo Total"} value={835}>
          <FaChartBar />
        </MoneyDetailsContainer>

      </aside>

      {
        isAddProfitModalOpen &&
        <section className='fixed inset-0 overflow-hidden h-screen w-full bg-black/50 z-50 px-1 flex justify-center items-end'>

          <div className='bg-white w-full px-4 py-6 rounded-t-lg flex flex-col gap-4'>

            <div className='flex flex-row justify-between items-center'>
              <h2 className='font-semibold'>Nova Receita</h2>

              <span className='text-lg'
                onClick={() => handleAddProfitModal()}
              >
                <MdClose />
              </span>
            </div>

            <form className='flex flex-col gap-4' onSubmit={(e) => handleAddNewProfit(e)}>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Valor</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <span className='text-gray-500'>R$</span>
                  <input type="number" className='w-full outline-0' placeholder='0,00' value={profitPrice} onChange={(e) => setProfitPrice(Number(e.target.value))} />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Descrição</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="text" className='w-full outline-0' placeholder='Ex: Salário, Freelance...' value={profitDescription} onChange={(e) => setProfitDescription(e.target.value)} />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Categoria</label>
                <select
                  className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'
                  value={profitCategory}
                  onChange={(e) => setProfitCategory(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  {profitCategories.map((category, key) => (
                    <option value={category.id} key={key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Data</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="date" className='w-full outline-0' value={profitDate} onChange={(e) => setProfitDate(e.target.value)} />
                </div>
              </div>

              <button className='bg-green-500 text-white font-semibold py-2 rounded-md'>
                Adicionar Receita
              </button>

            </form>

          </div>


        </section>
      }

      {
        isAddExpenseModalOpen &&
        <section className='fixed inset-0 overflow-hidden h-screen w-full bg-black/50 z-50 px-1 flex justify-center items-end'>

          <div className='bg-white w-full px-4 py-6 rounded-t-lg flex flex-col gap-4'>

            <div className='flex flex-row justify-between items-center'>
              <h2 className='font-semibold'>Novo Gasto</h2>

              <span className='text-lg'
                onClick={() => handleAddExpenseModal()}
              >
                <MdClose />
              </span>
            </div>

            <form className='flex flex-col gap-4'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Valor</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <span className='text-gray-500'>R$</span>
                  <input type="number" className='w-full outline-0' placeholder='0,00' />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Descrição</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="text" className='w-full outline-0' placeholder='Ex: Aluguel, Alimentação...' />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Categoria</label>
                <select className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  {
                    expenseCategories.map((category, key) => (
                      <option value={category.name} key={key}>{category.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm text-gray-700'>Data</label>
                <div className='flex flex-row border border-gray-300 p-2 rounded-md gap-1'>
                  <input type="date" className='w-full outline-0' />
                </div>
              </div>

              <button className='bg-red-500 text-white font-semibold py-2 rounded-md'>
                Adicionar Gasto
              </button>

            </form>

          </div>


        </section>
      }


      <section className='flex flex-col px-2 py-4 gap-6'>

        <div className='flex flex-row justify-between gap-4'>

          <button className='bg-slate-800 text-white flex flex-col justify-center items-center rounded-lg p-4 w-full'
            onClick={() => handleAddProfitModal()}
          >

            <span className='text-lg'>
              <IoMdAddCircleOutline />
            </span>

            <span>Nova Receita</span>

          </button>

          <button className='border border-gray-400 flex flex-col justify-center items-center rounded-lg p-4 w-full'
            onClick={() => handleAddExpenseModal()}
          >

            <span className='text-lg'>
              <IoMdRemoveCircleOutline />
            </span>

            <span
            >Adicionar Gasto</span>

          </button>

        </div>

        <div className="flex flex-col gap-4">

          <div className='flex flex-row justify-between items-center text-lg'>
            <h2 className='text-base font-semibold'>Transações Recentes</h2>

          </div>

          <ul className='flex flex-col gap-2'>

            {
              reports.map((report, key) => (

                <li className='flex flex-row border border-gray-400 rounded-md py-2 px-3 items-center gap-4' key={key}>
                  <div className='text-2xl p-2 rounded-full bg-pink-200 text-pink-700 '>
                    <IoFastFood />
                  </div>

                  <div className='flex flex-col w-full'>
                    <div className='flex flex-row items-center justify-between text-black'>
                      <h3>{report.name}</h3>
                      <span>+R$ {report.price}</span>
                    </div>

                    <div className='flex flex-row items-center-safe justify-between text-sm text-gray-700'>
                      <h4>{report.categories?.name}</h4>
                      <span>
                        {dayjs(report.created_at).format("DD/MM/YYYY")}
                      </span>
                    </div>
                  </div>

                </li>
              ))
            }

          </ul>

        </div>

      </section>


    </>
  )
}

export default App
