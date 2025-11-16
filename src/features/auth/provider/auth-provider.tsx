import { useEffect } from "react"
import { useAuthStore } from "../store/auth-store"

export default function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { initialize, isLoading, isInitialized } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading && !isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Загрузка...</div>
      </div>
    )
  }

  return <>{children}</>
}