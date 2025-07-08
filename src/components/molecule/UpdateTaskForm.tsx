import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateTask } from "@/lib/api";
import type { TaskUpdateForm } from "@/constants/Interfaces";

export function UpdateTaskForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskUpdateForm>();

  const mutation = useMutation({
    mutationFn: (data: TaskUpdateForm) =>
      updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      alert("Task updated!");
      reset();
    },
    onError: () => {
      alert("Failed to update task");
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-medium px-4 py-2 rounded shadow"
          variant="outline"
        >
          Update Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Mark task as completed</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="id">Task ID</Label>
              <Input
                id="id"
                {...register("id", { required: "Task ID is required" })}
              />
              {errors.id && (
                <span className="text-red-600 text-sm">
                  {errors.id.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="text-white hover:text-white" variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Mark as Completed"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
