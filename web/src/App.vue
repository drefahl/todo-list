<template>
  <div class="min-h-screen surface-ground">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <header class="mb-6 sm:mb-8 text-center">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">Lista de Tarefas</h1>
        <p class="text-sm sm:text-base text-muted-color">Organize suas tarefas de forma eficiente</p>
      </header>

      <main class="space-y-6 sm:space-y-8">
        <TaskForm />
        <TaskList />
      </main>
    </div>

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';
import ConfirmDialog from 'primevue/confirmdialog';
</script>
