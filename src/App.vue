<template>
  <main role="main" class="grid place-content-center min-h-screen bg-gray-200">
    <button
        type="button"
        @click.prevent="doShowModal"
        aria-label="Hablar con mi tutor"
        class="rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow hover:bg-blue-400 focus:bg-primary-700 active:bg-blue-700"
    >
      Hablar con mi tutor
    </button>
    <Transition name="fade">
      <ModalComponent v-if="showModal" @hide-modal="hideModal"/>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modal/ModalComponent.vue";
import { ref } from "vue";

const showModal = ref(false);

function doShowModal(): void {
  showModal.value = true;
}

function hideModal(event: boolean): void {
  showModal.value = !event;
}

</script>
