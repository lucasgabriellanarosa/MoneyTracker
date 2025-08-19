import { FaArrowDown, FaArrowUp, FaChartBar } from 'react-icons/fa'
import './App.css'
import MoneyDetailsContainer from './components/MoneyDetailsContainer/MoneyDetailsContainer'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useRef, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IoFastFood } from 'react-icons/io5';

function App() {

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

  }, [selectedDate]);

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

      <section className='flex flex-col px-2 py-4 gap-6'>

        <div className='flex flex-row justify-between gap-4'>

          <button className='bg-slate-800 text-white flex flex-col justify-center items-center rounded-lg p-4 w-full'>

            <span className='text-lg'>
              <IoMdAddCircleOutline />
            </span>

            <span>Nova Receita</span>

          </button>

          <button className='border border-gray-400 flex flex-col justify-center items-center rounded-lg p-4 w-full'>

            <span className='text-lg'>
              <IoMdRemoveCircleOutline />
            </span>

            <span>Adicionar Gasto</span>

          </button>

        </div>

        <div className="flex flex-col gap-4">

          <div className='flex flex-row justify-between items-center text-lg'>
            <h2 className='text-base font-semibold'>Transações Recentes</h2>

          </div>

          <ul className='flex flex-col gap-2'>

            <li className='flex flex-row border border-gray-400 rounded-md py-2 px-3 items-center gap-4'>
              <div className='text-2xl p-2 rounded-full bg-gray-200 text-gray-600'>
                <IoFastFood />
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center justify-between text-black'>
                  <h3>Alimentação</h3>
                  <span>+R$ 45,00</span>
                </div>

                <div className='flex flex-row items-center-safe justify-between text-sm text-gray-700'>
                  <h4>Restaurante</h4>
                  <span>12:15</span>
                </div>
              </div>

            </li>

            <li className='flex flex-row border border-gray-400 rounded-md py-2 px-3 items-center gap-4'>
              <div className='text-2xl p-2 rounded-full bg-gray-200 text-gray-600'>
                <IoFastFood />
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center justify-between text-black'>
                  <h3>Alimentação</h3>
                  <span>+R$ 45,00</span>
                </div>

                <div className='flex flex-row items-center-safe justify-between text-sm text-gray-700'>
                  <h4>Restaurante</h4>
                  <span>12:15</span>
                </div>
              </div>

            </li>

          </ul>

        </div>

      </section>

    </>
  )
}

export default App
