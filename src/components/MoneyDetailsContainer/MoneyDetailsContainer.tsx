
function MoneyDetailsContainer({children, title, value}: {children: React.ReactNode, title:string, value: number}) {
    return (
        <div className="bg-white flex flex-row border border-gray-300 rounded-lg px-4 py-2 text-gray-500 items-center justify-between text-lg w-full md:py-3 md:text-xl">

            <div className="text-sm md:text-base">
                <h3>{title}</h3>
                <span className="text-gray-800 text-base md:text-lg">R$ {value}</span>
            </div>

            {children}

        </div>

    )
}

export default MoneyDetailsContainer