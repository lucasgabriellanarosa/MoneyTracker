import { FourSquare } from "react-loading-indicators"

function Loading() {
    return (
        <section className="flex justify-center items-center py-20">
            <FourSquare color="#0f172a" size="large" text="Carregando..." textColor="" />
        </section>
    )
}

export default Loading