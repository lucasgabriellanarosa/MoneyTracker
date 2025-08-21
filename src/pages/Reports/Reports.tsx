function Reports() {
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

      <section className='flex flex-col px-2 py-4 gap-6'>

        <div className="flex flex-col gap-2">
          <h2>Resumo do Mês</h2>
          <div className="flex flex-row border border-gray-300 rounded-md justify-between p-4">

            <div className="flex flex-col justify-center items-center">
              <span className="text-sm uppercase text-gray-500 ">Receitas</span>
              <span className="text-green-600">R$ 3.840,00</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-sm uppercase text-gray-500 ">Gastos</span>
              <span className="text-red-600">R$ 2.335,00</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-sm uppercase text-gray-500 ">Saldo</span>
              <span className="text-gray-800">R$ 1.505,00</span>
            </div>

          </div>
        </div>

      </section>
    </>
  )
}

export default Reports