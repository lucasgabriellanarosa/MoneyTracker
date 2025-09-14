import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

type GraphData = {
    id: number;
    label: string;
    value: number;
}

function useGetMonthGraphData(selectedDate: string, userId?: string) {
    const [data, setData] = useState<GraphData[]>([]);
    const [isGraphLoading, setIsGraphLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchCategorySummary() {
            if (!userId) return;
            setIsGraphLoading(true);



            const startOfMonth = dayjs(selectedDate).startOf('month').format("YYYY-MM-DD");
            const endOfMonth = dayjs(selectedDate).endOf('month').format("YYYY-MM-DD");

            const { data, error } = await supabase
                .from("daily_reports")
                .select(`
                price,
                categories!daily_reports_category_id_fkey (
                    id,
                    name
                )
                `)
                .eq("user_id", userId)
                .eq("type", "gasto")
                .gte("date", startOfMonth)
                .lte("date", endOfMonth);


            if (error) {
                console.error(error);
                setError(error.message);
                setIsGraphLoading(false);
                return;
            }

            // Agrupamento por categoria
            const grouped = (data ?? []).reduce((acc: Record<string, number>,  t: any) => {
                const cat = t.categories?.name || "Sem categoria";
                const valor = Number(t.price) || 0;
                acc[cat] = (acc[cat] || 0) + valor;
                return acc;
            }, {});

            // Transformar em formato para o gráfico
            const formatted: GraphData[] = Object.entries(grouped).map(
                ([categoria, total], i) => ({
                    id: i,
                    label: categoria,
                    value: total,
                })
            );

            setData(formatted);
            setIsGraphLoading(false);
        }

        fetchCategorySummary();
    }, [selectedDate, userId]);

    return { data, isGraphLoading, error };
}

export default useGetMonthGraphData;
