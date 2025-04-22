<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: [String, Number],
    error: {
        type: String,
        default: null,
    },
    unit: {
        type: String,
        default: null,
    },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({focus: () => input.value.focus()});
</script>

<template>
    <div class="relative flex rounded-md shadow-sm mt-1">
        <input
            v-bind:class="[
                'block w-full rounded-none rounded-l-md',
                error
                    ? 'border-red-500 dark:border-red-400 dark:bg-slate-900 dark:text-slate-300 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
                    : 'border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary'
            ]"
            class="placeholder:text-slate-400 placeholder:dark:text-slate-400/50"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
        />
        <span
            v-if="unit"
            class="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 dark:border-slate-700 px-3 text-sm text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800"
        >
            {{ unit }}
        </span>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
</template>
