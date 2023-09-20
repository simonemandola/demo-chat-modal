<template>
  <form>
    <label>
      <input
          ref="attachmentHTMLInput"
          type="file"
          accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          @change="onAttachFile"
          :disabled="disabledFileInput"
      >
      <button
          v-if="hasAttachment"
          type="button"
          @click.prevent="clearAttachment"
      >-</button>
    </label>
    <label>
      <input class="text--overlay" v-model="message" type="text" :disabled="disabledTextInput">
    </label>
    <button type="submit" @click.prevent="submitData">Send</button>
  </form>
</template>

<script setup lang="ts">

import {computed, ref, nextTick} from "vue";
import {useConversationStore} from "../../../store/store";

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

function submitData(): void {

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
