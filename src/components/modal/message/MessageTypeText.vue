<template>
  <article>
    <div>
      <p>{{ message.body }}</p>
      <time datetime="">{{ getPublishDateText(message.date) }}</time>
    </div>
    <img :src="getAvatarUrl(message.isStudent)" :alt="message.author" height="100">
  </article>
</template>

<script setup lang="ts">

import { studentAvatar, tutorAvatar } from "../../../../data/data";
import { formatDateDayMonthYear, formatTimeHoursAndMinutes } from "../../../../mixins/mixins";

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
