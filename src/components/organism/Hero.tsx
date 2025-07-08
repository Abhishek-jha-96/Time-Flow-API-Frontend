import LoginPage from "./LoginPage";
import TaskTable from "./TaskTable";
import { useAuthStore } from "@/stores/authStore";


export default function Hero() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  return (
    <div>
        {
        isLoggedIn ? (<TaskTable />) : (<LoginPage />)
    }
    </div>
  )
}
