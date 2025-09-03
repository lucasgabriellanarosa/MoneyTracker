import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import type { Category } from "../@types/Category";

function useGetCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select();
      if (error) {
        setError(error.message);
      } else {
        setCategories(data);
      }
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export default useGetCategories;
