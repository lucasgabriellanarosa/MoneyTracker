import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"
import type { User } from "@supabase/supabase-js"

export function useUserData() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true

    async function fetchUser() {
      setLoading(true)
      await supabase.auth.refreshSession()
      const { data, error } = await supabase.auth.getUser()
      if (error) setError(error.message)
      if (isMounted) {
        setUser(data?.user ?? null)
        setLoading(false)
      }
    }

    fetchUser()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      isMounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  return { user, loading, error }
}
