<template>
  <Card class="hover:shadow-md transition-shadow">
    <template #content>
      <div class="flex gap-3 p-0">
        <Checkbox
          :model-value="task.completed"
          @update:model-value="$emit('toggle', task)"
          :binary="true"
          :disabled="isUpdating"
          class="mt-0.5 flex-shrink-0"
        />

        <div class="flex-1 min-w-0">
          <div v-if="!isEditing" class="mb-2">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span
                class="text-sm sm:text-base text-primary-500 font-medium leading-tight"
                :class="{ 'line-through text-surface-500': task.completed }"
              >
                {{ task.title }}
              </span>

              <Tag
                v-if="task.priority > 0"
                :severity="prioritySeverity[task.priority as keyof typeof prioritySeverity]"
                :value="priorityLabels[task.priority as keyof typeof priorityLabels]"
                class="text-xs flex-shrink-0"
              />
            </div>
          </div>

          <div v-else class="mb-2">
            <InputText
              ref="editInput"
              v-model="editTitle"
              class="w-full text-sm sm:text-base"
              @keydown.enter="saveEdit"
              @keydown.escape="cancelEdit"
              @blur="saveEdit"
            />
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-surface-500">
              <span class="whitespace-nowrap">Criada: {{ formatDate(task.createdAt) }}</span>
              <span v-if="task.updatedAt !== task.createdAt" class="whitespace-nowrap">
                Atualizada: {{ formatDate(task.updatedAt) }}
              </span>
            </div>

            <div class="flex items-center gap-1 flex-shrink-0">
              <Button
                v-if="!isEditing"
                @click="startEdit"
                icon="pi pi-pencil"
                severity="secondary"
                text
                rounded
                :disabled="isUpdating"
                v-tooltip="'Editar tarefa'"
                size="small"
                class="h-8 w-8"
              />

              <Button
                @click="confirmDelete()"
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                :disabled="isUpdating"
                v-tooltip="'Excluir tarefa'"
                size="small"
                class="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import type { Task } from '@/stores/taskStore';
import { useTaskStore } from '@/stores/taskStore';
import { useConfirm } from 'primevue/useconfirm';

interface Props {
  task: Task;
}

interface Emits {
  update: [task: Task, newTitle: string];
  delete: [task: Task];
  toggle: [task: Task];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const taskStore = useTaskStore();
const confirm = useConfirm();

const isEditing = ref(false);
const editTitle = ref('');
const editInput = ref<HTMLInputElement>();

const isUpdating = computed(() => taskStore.isUpdating);

const priorityLabels = {
  0: 'Baixa',
  1: 'Média',
  2: 'Alta',
} as const;

const prioritySeverity = {
  0: 'secondary',
  1: 'warning',
  2: 'danger',
} as const;

const startEdit = async () => {
  isEditing.value = true;
  editTitle.value = props.task.title;
  await nextTick();
  editInput.value?.focus();
};

const saveEdit = () => {
  if (editTitle.value.trim() && editTitle.value.trim() !== props.task.title) {
    emit('update', props.task, editTitle.value.trim());
  }
  cancelEdit();
};

const cancelEdit = () => {
  isEditing.value = false;
  editTitle.value = '';
};

const confirmDelete = () => {
  confirm.require({
    message: 'Você tem certeza que deseja excluir esta tarefa?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Excluir',
    },
    accept: () => {
      emit('delete', props.task);
    },
  });
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>
