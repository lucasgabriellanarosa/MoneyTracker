import dayjs from "dayjs"
import Loading from "../../components/Loading/Loading"
import { useGetUserSummary } from "../../hooks/useGetUserSummary"
import { useUserData } from "../../hooks/useUserData"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useRef, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import useGetMonthGraphData from "../../hooks/useGetMonthGraphData";
import { PieChart } from '@mui/x-charts/PieChart';

function Reports() {
  const { user } = useUserData()

  // Dates and calendar
  dayjs.locale('pt-br');
  dayjs.extend(customParseFormat);
  const today = dayjs();
  const [selectedDate, setSelectedDate] = useState(today)
  const carouselRef = useRef<HTMLUListElement>(null);

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

  // Get User Reports
  const { gastos, receitas, saldo, loading } = useGetUserSummary(selectedDate.format("YYYY-MM-DD"), user?.id)


  const { data: gastosPorCategoria, isGraphLoading } = useGetMonthGraphData(
    selectedDate.format("YYYY-MM-DD"),
    user?.id
  );

  return (
    <>

      <header className='flex flex-col w-full bg-gray-50 shadow-sm'>

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

      </header >

      {
        loading ?
          <Loading />
          :

          <section className='flex flex-col px-2 py-4 gap-6'>

            <div className="flex flex-col gap-2">
              <h2>Resumo do Mês</h2>
              <div className="flex flex-row border border-gray-300 rounded-md justify-between p-4">

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm uppercase text-gray-500 ">Receitas</span>
                  <span className="text-green-600">R$ {receitas}</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm uppercase text-gray-500 ">Gastos</span>
                  <span className="text-red-600">R$ {gastos}</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm uppercase text-gray-500 ">Saldo</span>
                  <span className="text-gray-800">R$ {saldo}</span>
                </div>

              </div>
              {
                isGraphLoading ? (
                  <Loading />
                ) : gastosPorCategoria.length > 0 ? (
                  <PieChart
                    series={[{ data: gastosPorCategoria }]}
                    width={200}
                    height={200}
                  />
                ) : (
                  <p className="text-sm text-gray-500">Nenhum gasto encontrado neste mês.</p>
                )
              }
            </div>

          </section>
      }
    </>
  )
}

export default Reports