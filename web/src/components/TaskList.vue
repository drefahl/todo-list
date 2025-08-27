<template>
  <div class="space-y-4 sm:space-y-6">
    <Card>
      <template #title>
        <h2 class="text-base sm:text-lg font-medium text-primary">Resumo das Tarefas</h2>
      </template>

      <template #content>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
          <div>
            <div class="text-xl sm:text-2xl font-bold text-primary">{{ taskStore.totalTasks }}</div>
            <div class="text-xs sm:text-sm text-surface-600">Total</div>
          </div>
          <div>
            <div class="text-xl sm:text-2xl font-bold text-yellow-600">{{ taskStore.pendingTasks.length }}</div>
            <div class="text-xs sm:text-sm text-surface-600">Pendentes</div>
          </div>
          <div>
            <div class="text-xl sm:text-2xl font-bold text-green-600">{{ taskStore.completedTasks.length }}</div>
            <div class="text-xs sm:text-sm text-surface-600">Concluídas</div>
          </div>
        </div>
      </template>
    </Card>

    <div v-if="taskStore.isLoading" class="text-center py-8">
      <ProgressSpinner />
      <div class="text-surface-600 mt-2">Carregando tarefas...</div>
    </div>

    <Card v-else-if="taskStore.tasks.length === 0">
      <template #content>
        <div class="text-center py-12">
          <div class="text-surface-500 mb-2">Nenhuma tarefa encontrada</div>
          <div class="text-sm text-surface-400">Crie sua primeira tarefa acima</div>
        </div>
      </template>
    </Card>

    <div v-else class="space-y-4">
      <div v-if="taskStore.pendingTasks.length > 0">
        <h3 class="text-md font-medium text-primary mb-3">Tarefas Pendentes</h3>
        <div class="space-y-2">
          <TaskItem
            v-for="task in taskStore.pendingTasks"
            :key="task.id"
            :task="task"
            @update="handleUpdateTask"
            @delete="handleDeleteTask"
            @toggle="handleToggleTask"
          />
        </div>
      </div>

      <div v-if="taskStore.completedTasks.length > 0">
        <h3 class="text-md font-medium text-primary mb-3">Tarefas Concluídas</h3>
        <div class="space-y-2">
          <TaskItem
            v-for="task in taskStore.completedTasks"
            :key="task.id"
            :task="task"
            @update="handleUpdateTask"
            @delete="handleDeleteTask"
            @toggle="handleToggleTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';

import { useTaskStore, type Task } from '@/stores/taskStore';
import TaskItem from './TaskItem.vue';
import type { UpdateTaskBody } from '@/api/generated';

const taskStore = useTaskStore();

const handleUpdateTask = async (task: Task, updateData: UpdateTaskBody) => {
  try {
    await taskStore.updateTask(task.id, updateData);
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};

const handleDeleteTask = async (task: Task) => {
  try {
    await taskStore.deleteTask(task.id);
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

const handleToggleTask = async (task: Task) => {
  try {
    await taskStore.toggleTaskCompletion(task);
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
};
</script>
