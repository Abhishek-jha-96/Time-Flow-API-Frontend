import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/authStore"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/lib/api"
import type { LoginFormInputs } from "@/constants/Interfaces"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const setLoggedIn = useAuthStore(state => state.setLoggedIn)
  const { register, handleSubmit } = useForm<LoginFormInputs>()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data.access

      if (token) {
        localStorage.setItem('token', token)
        setLoggedIn(true)
      } else {
        console.warn('No access_token found in response:', data)
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email', { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password', { required: true })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
