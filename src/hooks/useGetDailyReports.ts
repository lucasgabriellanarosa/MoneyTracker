// useGetDailyReports.ts
import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"

export function useGetDailyReports(selectedDate: string) {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("daily_reports")
        .select(`
          *,
          categories!daily_reports_category_id_fkey (
            id,
            name,
            color,
            type,
            icon
          )
        `)
        .eq("date", selectedDate)

      if (error) {
        setError(error.message)
        setReports([])
      } else {
        setReports(data || [])
      }
      setLoading(false)
    }

    if (selectedDate) fetchReports()
  }, [selectedDate])

  return { reports, loading, error }
}