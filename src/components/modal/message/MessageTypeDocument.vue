<template>
  <article
      aria-label="Mensaje de tipo documento"
      class="grid grid-cols-document-message justify-between items-center gap-y-4 py-5 border-y"
  >
    <section class="grid grid-flow-row gap-y-2">
      <p aria-label="Versión del trabajo" class="uppercase text-xs font-bold">Versión {{ message.attachment.version }}</p>
      <p aria-label="Nombre del archivo" class="text-blue-600 font-bold">{{ message.attachment.name }}</p>
      <aside
          aria-label="Detalles"
          aria-describedby="Detalles del mensaje, tipo, tamaño y fecha de publicación"
          class="grid grid-flow-col gap-x-2 w-fit text-xs md:text-sm text-gray-400">
        <p
            :aria-label="message.attachment.extension"
            aria-details="Tipo de documento">
          <span class="hidden md:inline">Documento / </span>{{ message.attachment.extension }}
        </p>
        <p
            :aria-label="getAttachmentSize(message.attachment.size)"
            aria-details="Tamaño">
          {{ getAttachmentSize(message.attachment.size) }}
        </p>
        <time
            aria-label="Fecha de publicación"
            aria-valuetext="getPublishDateText(message.date)"
            :datetime="getPublishDateText(message.date)"
            class="text-xs"
        >
          {{ getPublishDateText(message.date) }}
        </time>
      </aside>
    </section>
    <a
        v-if="message.attachment.url"
        :href="message.attachment.url"
        :download="message.attachment.name"
        class="text-blue-600 text-2xl justify-self-center hover:text-blue-400 transition ease-in-out duration-500"
        :title="`Descargar ${message.attachment.name}`"
        aria-label="Descargar"
        aria-describedby="Botón para descargar el archivo"
    >
      <i aria-hidden="true" class="fa-solid fa-cloud-arrow-down"></i>
    </a>
  </article>
</template>

<script setup lang="ts">
import { formatDateDayMonthYear, formatTimeHoursAndMinutes } from "@/mixins/mixins";

defineProps<{
  message: object,
}>();

// This function returns the document size value converted to MB if the result is greater than one, or in KB if it is smaller.
function getAttachmentSize( size: number ): string {
  const finalSize = parseFloat( ( size / 1048576 ).toFixed( 1 ) ); // Divided the size by one MB to get MB
  return finalSize >= 1 ? `(${ finalSize } MB)` : `(${ ( size / 1024 ).toFixed( 1 ) } KB)`; // Divided the size by one KB to get KB
}

// Callback mixins function to format date and hour into text
function getPublishDateText(publishDate: number): string {
  return `${formatDateDayMonthYear(publishDate, " ")} / ${formatTimeHoursAndMinutes(publishDate)}`;
}

</script>
