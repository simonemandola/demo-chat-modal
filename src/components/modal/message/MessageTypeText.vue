<template>
  <article
      aria-label="Mensaje de tipo texto"
      class="grid grid-cols-text-message items-start gap-5 py-2"
      :class="message.isStudent ? 'justify-end' : 'justify-start'"
  >
    <main
        aria-label="Contenido del mensaje"
        class="col-start-2 col-end-3 p-5 grid grid-flow-row gap-y-3 relative before:absolute before:w-4 before:h-4 before:transform before:rotate-45 before:top-8"
        :class="
          message.isStudent
          ? ['md:ml-12', 'bg-blue-500', 'text-white', 'before:bg-blue-500', 'before:-right-2']
          : ['order-1', 'md:mr-12', 'bg-gray-200', 'text-current', 'before:bg-gray-200', 'before:-left-2']"
    >
      <p aria-label="Mensaje">{{ message.body }}</p>
      <time
          aria-label="Fecha de publicación"
          aria-valuetext="getPublishDateText(message.date)"
          :datetime="getPublishDateText(message.date)"
          class="text-xs"
      >
        {{ getPublishDateText(message.date) }}
      </time>
    </main>
    <img
        aria-label="Avatar del usuario"
        :src="getAvatarUrl(message.isStudent)"
        :alt="message.author"
        class="w-full h-8 rounded-full justify-self-center object-cover mt-6"
        :class="message.isStudent ? ['col-start-3', 'col-end-4'] : ['col-start-1', 'col-end-2']"
    >
  </article>
</template>

<script setup lang="ts">

import { studentAvatar, tutorAvatar } from "@/data/data";
import { formatDateDayMonthYear, formatTimeHoursAndMinutes } from "@/mixins/mixins";

defineProps<{
  message: object,
}>();

function getAvatarUrl(isStudent: boolean): string {
  return isStudent ? studentAvatar : tutorAvatar;
}

function getPublishDateText(publishDate: number): string {
  return `${formatDateDayMonthYear(publishDate, " ")} / ${formatTimeHoursAndMinutes(publishDate)}`;
}

</script>
