<script setup>
defineProps({
    type: {
        type: String,
        default: "submit",
    },
});
</script>

<template>
    <button
        :type="type"
        class="inline-flex items-center px-2 py-1.5 bg-lime-600 border border-transparent rounded-md font-semibold
        text-xs text-white uppercase tracking-widest hover:bg-lime-500 active:bg-lime-700 focus:outline-none
        focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition ease-in-out
        duration-150"
    >
        <slot />
    </button>
</template>
