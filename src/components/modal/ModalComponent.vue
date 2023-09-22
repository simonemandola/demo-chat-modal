<template>
  <article
      class="bg-black bg-opacity-75 fixed inset-0 z-10 flex justify-center items-center overflow-auto py-8 px-3 md:px-6 box-border"
  >
    <section
        role="region"
        aria-modal="true"
        aria-label="Modal chat para hablar con el tutor"
        class="relative bg-white max-w-4xl h-full overflow-hidden max-h-48rem rounded">
      <aside
          aria-label="top-bar"
          aria-describedby="Parte superior de modal con título y botón para cerrar"
          class="sticky z-10 top-0 left-0 right-0 py-4 px-2 grid grid-cols-header justify-between items-center border-b-2 border-gray-700 bg-white shadow-md">
        <h1 class="justify-self-center font-medium ml-12" aria-label="Titulo comentarios, hablar con el tutor">Comentarios</h1>
        <button
            type="button"
            @click.prevent="hideModal"
            aria-label="Cerrar modal"
            class="text-blue-600 text-2xl transform transition ease-in-out duration-500 hover:rotate-180"
            title="Cerrar"
        >
          <i aria-hidden="true" class="fa-solid fa-xmark"></i>
        </button>
      </aside>
      <TransitionGroup
          ref="messagesListElement"
          name="slide-up"
          tag="ul"
          role="list"
          aria-label="Listado de mensajes"
          @enter="scrollToLastMessage($event)"
          class="h-full overflow-auto pt-4 pb-32 px-3 md:px-8 grid grid-flow-row gap-y-2 scroll-behavior-smooth"
      >
        <li v-for="(message, index) in messagesList" :key="index" aria-label="Mensaje enviado">
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
import { nextTick, onMounted, ref } from "vue";
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
  emit("hide-modal", true);
}

// Every time a message is added the function is fired and the messages list container scrolls to the last message.
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
