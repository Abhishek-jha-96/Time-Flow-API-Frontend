import LoginPage from "./LoginPage";
import TaskTable from "./TaskTable";
import { useAuthStore } from "@/stores/authStore";
import { usePrefetchQuery} from '@tanstack/react-query'
import { fetchTasks, fetchUser } from "@/lib/api";


export default function Hero() {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn)

   if (isLoggedIn) {
    // Prefetch during render
    usePrefetchQuery({
      queryKey: ['tasks'],
      queryFn: fetchTasks,
      staleTime: 60 * 1000,
    })

    usePrefetchQuery({
      queryKey: ['user'],
      queryFn: fetchUser,
      staleTime: 60 * 1000,
    })
  }

  return (
    <div>
        {
        isLoggedIn ? (<TaskTable />) : (<LoginPage />)
    }
    </div>
  )
}
