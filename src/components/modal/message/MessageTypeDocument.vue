<template>
  <article>
    <div>
      <p>Versión {{ message.attachment.version }}</p>
      <p>{{ message.attachment.name }}</p>
      <div>
        <p>Documento / {{ message.attachment.extension }}</p>
        <p>{{ getAttachmentSize(message.attachment.size) }}</p>
        <time :datetime="getPublishDateText(message.date)">{{ getPublishDateText(message.date) }}</time>
      </div>
    </div>
    <a :href="message.attachment.url" :download="message.attachment.name">D</a>
  </article>
</template>

<script setup lang="ts">
import { formatDateDayMonthYear, formatTimeHoursAndMinutes } from "../../../../mixins/mixins";

defineProps<{
  message: object,
}>();

function getAttachmentSize( size: number ): string {
  const finalSize = parseFloat( ( size / 1048576 ).toFixed( 1 ) ); // Divided the size by one MB to get MB
  return finalSize >= 1 ? `(${ finalSize } MB)` : `(${ ( size / 1024 ).toFixed( 1 ) } KB)`; // Divided the size by one KB to get KB
}

function getPublishDateText(publishDate: number): string {
  return `${formatDateDayMonthYear(publishDate, " ")} / ${formatTimeHoursAndMinutes(publishDate)}`;
}

</script>
