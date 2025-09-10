import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export function useGetUserSummary(userId?: string) {
    const [gastos, setGastos] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);

            const { data: gastosData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "gasto")

            const { data: receitasData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "receita")

            const totalGastos =
                gastosData?.reduce((acc, r) => acc + Number(r.price), 0) || 0;
            const totalReceitas =
                receitasData?.reduce((acc, r) => acc + Number(r.price), 0) || 0;

            setGastos(totalGastos);
            setReceitas(totalReceitas);
            setSaldo(totalReceitas - totalGastos);

            setLoading(false);
        };

        fetchData();
    }, [userId]);

    return { gastos, receitas, saldo, loading };
}
