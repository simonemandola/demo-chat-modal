<template>
  <button type="button" @click.prevent="doShowModal">Open</button>
  <Transition name="fade">
    <ModalComponent v-if="showModal" @hide-modal="hideModal"/>
  </Transition>
</template>

<script setup lang="ts">
import ModalComponent from "./components/modal/ModalComponent.vue";
import { ref } from "vue";

const showModal = ref(false);

function doShowModal(): void {
  showModal.value = true;
}

function hideModal(event: boolean): void {
  showModal.value = !event;
}

</script>
