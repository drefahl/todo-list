<template>
  <Card>
    <template #title>
      <div class="flex items-center gap-2">
        <i class="pi pi-plus"></i>
        Nova Tarefa
      </div>
    </template>

    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-8 mt-6">
        <div class="space-y-1">
          <FloatLabel>
            <InputText
              id="title"
              v-model="formData.title"
              :invalid="!!errors.title"
              placeholder="Digite o título da tarefa..."
              class="w-full"
            />
            <label for="title">
              Título
              <span class="text-red-500 ml-1">*</span>
            </label>
          </FloatLabel>

          <small v-if="errors.title" class="text-red-500 block">
            {{ errors.title }}
          </small>
        </div>

        <div class="space-y-1">
          <FloatLabel>
            <Dropdown
              id="priority"
              v-model="formData.priority"
              :options="priorityOptions"
              :default-value="formData.priority"
              option-label="label"
              option-value="value"
              placeholder="Selecione a prioridade"
              class="w-full"
            />
            <label for="priority">Prioridade</label>
          </FloatLabel>

          <small v-if="errors.priority" class="text-red-500 block">
            {{ errors.priority }}
          </small>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 pt-4">
          <Button type="submit" :loading="isSubmitting" class="flex-1 justify-center">
            <i class="pi pi-check mr-2"></i>
            <span class="hidden sm:inline">Criar Tarefa</span>
            <span class="sm:hidden">Criar</span>
          </Button>

          <Button
            type="button"
            severity="secondary"
            outlined
            @click="resetForm"
            :disabled="isSubmitting"
            class="sm:w-auto justify-center"
          >
            <i class="pi pi-refresh mr-2"></i>
            <span class="hidden sm:inline">Limpar</span>
            <span class="sm:hidden">Reset</span>
          </Button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import { useTaskStore } from '@/stores/taskStore';
import { createTaskSchema } from 'shared';
import type { ZodError } from 'zod';

const taskStore = useTaskStore();

const formData = reactive({
  title: '',
  priority: 1,
});

const errors = reactive({
  title: '',
  priority: '',
});

const isSubmitting = ref(false);

const priorityOptions = [
  { label: 'Baixa', value: 1 },
  { label: 'Média', value: 2 },
  { label: 'Alta', value: 3 },
];

function validateForm() {
  errors.title = '';
  errors.priority = '';

  try {
    createTaskSchema.parse(formData);
    return true;
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as ZodError;

      zodError.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors;
        if (field && field in errors) {
          errors[field] = issue.message;
        }
      });
    }
    return false;
  }
}

async function handleSubmit() {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    await taskStore.createTask(formData);
    resetForm();
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  formData.title = '';
  formData.priority = 1;
  errors.title = '';
  errors.priority = '';
}
</script>
