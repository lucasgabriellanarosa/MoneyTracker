import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

type GraphData = {
  id: number;
  label: string;
  value: number;
  color: string;
};

function useGetMonthGraphData(selectedDate: string, userId?: string) {
  const [expensesData, setExpensesData] = useState<GraphData[]>([]);
  const [profitsData, setProfitsData] = useState<GraphData[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategorySummary() {
      if (!userId) return;
      setIsGraphLoading(true);

      const startOfMonth = dayjs(selectedDate)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = dayjs(selectedDate)
        .endOf("month")
        .format("YYYY-MM-DD");

      try {
        const { data, error } = await supabase
          .from("daily_reports")
          .select(
            `
              price,
              type,
              categories!daily_reports_category_id_fkey (
                id,
                name,
                color
              )
            `
          )
          .eq("user_id", userId)
          .gte("date", startOfMonth)
          .lte("date", endOfMonth);

        if (error) throw error;

        const gastos = (data ?? []).filter((t) => t.type === "gasto");
        const receitas = (data ?? []).filter((t) => t.type === "receita");

        const groupByCategory = (items: any[]) => {
          const grouped = items.reduce(
            (acc: Record<string, { total: number; color?: string }>, t: any) => {
              const cat = t.categories?.name || "Sem categoria";
              const valor = Number(t.price) || 0;
              const color = t.categories?.color;

              if (!acc[cat]) {
                acc[cat] = { total: 0, color };
              }
              acc[cat].total += valor;
              return acc;
            },
            {}
          );

          return Object.entries(grouped).map(([categoria, { total, color }], i) => ({
            id: i,
            label: categoria,
            value: total,
            color: color ?? "#cccccc"
          }));
        };

        setExpensesData(groupByCategory(gastos));
        setProfitsData(groupByCategory(receitas));
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsGraphLoading(false);
      }
    }

    fetchCategorySummary();
  }, [selectedDate, userId]);

  return { expensesData, profitsData, isGraphLoading, error };
}

export default useGetMonthGraphData;
