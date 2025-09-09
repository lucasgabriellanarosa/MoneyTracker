import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

export function useGetTodayData(selectedDate:string, userId?: string) {
    const [gastos, setGastos] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [lucro, setLucro] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchData = async () => {
            setLoading(true);

            const startOfDay = dayjs(selectedDate).startOf("day").toISOString()
            const endOfDay = dayjs(selectedDate).endOf("day").toISOString()

            const { data: gastosData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "gasto")
                .gte("created_at", startOfDay)
                .lte("created_at", endOfDay);

            const { data: receitasData } = await supabase
                .from("daily_reports")
                .select("price")
                .eq("type", "receita")
                .gte("created_at", startOfDay)
                .lte("created_at", endOfDay);

            const totalGastos =
                gastosData?.reduce((acc, r) => acc + Number(r.price), 0) || 0;
            const totalReceitas =
                receitasData?.reduce((acc, r) => acc + Number(r.price), 0) || 0;

            setGastos(totalGastos);
            setReceitas(totalReceitas);
            setLucro(totalReceitas - totalGastos);

            setLoading(false);
        };

        fetchData();
    }, [userId]);

    return { gastos, receitas, lucro, loading };
}
