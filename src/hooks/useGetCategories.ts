import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import type { Category } from "../@types/Category";
import { useUserData } from "./useUserData";

function useGetCategories() {
  const { user } = useUserData();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      if (!user) {
        setCategories([]);
        return;
      }

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        setError(error.message);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    }

    fetchCategories();
  }, [user]);

  return { categories, loading, error };
}

export default useGetCategories;
