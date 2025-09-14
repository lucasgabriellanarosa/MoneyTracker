import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

export function useGetUserSummary(selectedDate: string, userId?: string) {
    const [gastos, setGastos] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);

            const startOfMonth = dayjs(selectedDate).startOf("month").toISOString()
            const endOfMonth = dayjs(selectedDate).endOf("month").toISOString()

            const { data: gastosData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "gasto")
                .gte("created_at", startOfMonth)
                .lte("created_at", endOfMonth);

            const { data: receitasData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "receita")
                .gte("created_at", startOfMonth)
                .lte("created_at", endOfMonth);

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
    }, [userId, selectedDate]);

    return { gastos, receitas, saldo, loading };
}
