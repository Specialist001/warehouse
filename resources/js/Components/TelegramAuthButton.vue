<script setup>

import { computed } from "vue";
import {usePage} from "@inertiajs/vue3";


const telegram_redirect_uri = usePage().props.telegram_redirect_uri;
const telegram_bot_name = usePage().props.telegram_bot_name;

const telegram_button = computed(() => {
    return `<script async src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="${telegram_bot_name}"
          data-size="medium"
          data-radius="6"
          data-auth-url="${telegram_redirect_uri}"><\/script>`;
});
</script>

<template>
    <div v-html="telegram_button"></div>
</template>

<style scoped>

</style>
