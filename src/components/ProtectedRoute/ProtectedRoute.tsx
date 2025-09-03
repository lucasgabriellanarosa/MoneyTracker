import { Navigate } from "react-router"
import { useUserData } from "../../hooks/useUserData"
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useUserData()

  if (loading) return <p>Carregando...</p>

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
