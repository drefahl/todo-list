import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useGetTasks, useCreateTask, useUpdateTask, useDeleteTask } from '@/api/generated';
import type { CreateTaskBody, UpdateTaskBody } from '@/api/generated';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useTaskStore = defineStore('tasks', () => {
  const { data: tasksData, isLoading, refetch } = useGetTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const tasks = computed(() => {
    if (tasksData.value?.data) return tasksData.value.data as Task[];
    return [];
  });

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
  const pendingTasks = computed(() => tasks.value.filter((task) => !task.completed));
  const totalTasks = computed(() => tasks.value.length);

  const loadTasks = async () => {
    await refetch();
  };

  const createTask = async (taskData: CreateTaskBody) => {
    await createTaskMutation.mutateAsync({ data: taskData });
    await loadTasks();
  };

  const updateTask = async (id: number, taskData: UpdateTaskBody) => {
    await updateTaskMutation.mutateAsync({ id, data: taskData });
    await loadTasks();
  };

  const deleteTask = async (id: number) => {
    await deleteTaskMutation.mutateAsync({ id });
    await loadTasks();
  };

  const toggleTaskCompletion = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
  };

  return {
    tasks,

    completedTasks,
    pendingTasks,
    totalTasks,

    isLoading,
    isUpdating: computed(() => updateTaskMutation.isPending.value),

    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
});
