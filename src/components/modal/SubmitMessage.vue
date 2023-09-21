<template>
  <form
      aria-label="form"
      aria-describedby="Formulario con caja de texto, botón para adjuntar archivos y botón para enviar el mensaje"
      role="form"
      class="sticky bottom-0 left-0 right-0 py-4 px-4 md:px-12 border-t border-gray-500 bg-white shadow-md grid grid-cols-submit gap-x-2 md:gap-x-4 h-8 box-content">
    <label class="relative cursor-pointer flex justify-items-center items-center">
      <input
          ref="attachmentHTMLInput"
          type="file"
          accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          @change="onAttachFile"
          :disabled="disabledFileInput"
          aria-label="Adjuntar archivo"
          :aria-disabled="disabledFileInput"
          :aria-hidden="hasAttachment"
          class="custom-input--file text-transparent w-full"
      >
      <button
          v-if="hasAttachment"
          type="button"
          @click.prevent="clearAttachment"
          class="absolute inset-0 bg-blue-100 w-full rounded-full border border-blue-200 text-gray-500 transition ease-in-out duration-700 hover:bg-blue-300 hover:border-blue-500"
          title="Remover archivo adjunto"
          aria-label="Remover archivo"
          :aria-hidden="!hasAttachment"
      >
        <i aria-hidden="true" class="fa-solid fa-xmark"></i>
      </button>
      <span
          v-else
          class="absolute inset-0 flex justify-center items-center text-gray-600 rounded-full border border-blue-200 transition ease-in-out duration-500 hover:bg-blue-100"
          title="Adjuntar archivo"
          aria-hidden="true"
          :class="{'opacity-50 hover:cursor-not-allowed' : disabledFileInput}"
      >
        <i class="fa-solid fa-paperclip"></i>
      </span>
    </label>
    <label :aria-hidden="disabledTextInput" class="w-full">
      <input
          v-model="message"
          type="text"
          :disabled="disabledTextInput"
          aria-label="Escribir mensaje"
          :aria-disabled="disabledTextInput"
          :placeholder="inputTextPlaceholder"
          :aria-placeholder="hasAttachment ? inputTextPlaceholder : 'Escribir mensaje'"
          class="w-full h-full bg-gray-100 rounded-full border border-gray-300 px-4 focus:outline-none focus:border-1 focus:border-blue-300 hover:border-1 hover:border-blue-300 transition ease-in-out duration-500 placeholder:italic disabled:border-0 disabled:shadow-none"
          :class="{'opacity-50 hover:cursor-not-allowed' : disabledTextInput}"
      >
    </label>
    <button
        type="submit"
        @click.prevent="submitData"
        aria-label="Enviar mensaje"
        class="bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-400 transition ease-in-out duration-500"
        title="Enviar"
    >
      <i aria-hidden="true" class="fa-solid fa-paper-plane text-white"></i>
    </button>
  </form>
</template>

<script setup lang="ts">

import { computed, ref, nextTick } from "vue";
import { useConversationStore } from "../../../store/store";

const conversationStore = useConversationStore();
const message = ref("");
const attachment = ref({});
const attachmentHTMLInput = ref();
const hasAttachment = computed(()=> {
  return !!(attachment.value?.name);
});
const disabledTextInput = computed(()=> {
  return hasAttachment.value;
});
const disabledFileInput = computed(()=> {
  return !!(message.value);
})
const inputTextPlaceholder = computed(()=> {
  return hasAttachment.value ? "Enviar: " + attachment.value.name : "";
});

function submitData(): void {

  // remove whitespace from both ends
  message.value = message.value.trim();

  if (!message.value && !hasAttachment.value)
    return

  if (hasAttachment.value) {
    conversationStore.sendAttachmentMessage(attachment.value);
    // Clear Input file field
    nextTick(()=> {
      clearAttachment();
    })
  } else {
    conversationStore.sendTextMessage(message.value);
    // Clear input text field
    nextTick(()=> {
      clearMessageValue();
    })
  }

}

function onAttachFile(event: Event): void {
  attachment.value = (event.target as object).files[0];
  clearMessageValue();
}

function clearAttachment(): void {
  attachment.value = {};
  attachmentHTMLInput.value.value = "";
}

function clearMessageValue(): void {
  message.value = "";
}

</script>
