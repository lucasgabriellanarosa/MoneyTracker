import { Navigate } from "react-router"
import { useUserData } from "../../hooks/useUserData"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUserData()

  if (loading) return <p>Carregando...</p>

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
