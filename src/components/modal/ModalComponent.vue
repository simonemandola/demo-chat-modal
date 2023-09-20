<template>
  <article>
    <section>
      <aside>
        <h1>Comentarios</h1>
        <button type="button" @click.prevent="hideModal">X</button>
      </aside>
      <TransitionGroup
          ref="messagesListElement"
          name="fade"
          tag="ul"
          @after-appear="scrollToLastMessage($event)"
          style="max-height: 24rem; max-width: 32rem; overflow: auto; scroll-behavior: smooth;"
      >
        <li v-for="(message, index) in messagesList" style="border-bottom: 1px solid whitesmoke" :key="index">
          <!-- Message type document -->
          <MessageTypeDocument v-if="message.attachment.name" :message="message" />
          <!-- Message type text -->
          <MessageTypeText v-else :message="message" />
        </li>
      </TransitionGroup>
      <!-- Submit message -->
      <SubmitMessage />
    </section>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConversationStore } from "../../../store/store";
import {defineEmits, nextTick, onMounted, ref} from "vue";
import MessageTypeDocument from "./message/MessageTypeDocument.vue";
import MessageTypeText from "./message/MessageTypeText.vue";
import SubmitMessage from "./SubmitMessage.vue";

const emit = defineEmits<{
  (e: "hide-modal", value: boolean),
}>();

const conversationStore = useConversationStore();
const { messagesList } = storeToRefs(conversationStore);
const messagesListElement = ref();

function hideModal(): void {
  emit("hide-modal", true)
}

function scrollToLastMessage(element: HTMLUListElement): void {
  messagesListElement.value?.$el.scrollBy({
    top: element.getBoundingClientRect().bottom,
    behaviour: "smooth",
  });
}

onMounted(()=> {
  nextTick(()=> {
    scrollToLastMessage(messagesListElement.value?.$el);
  });
})

</script>
