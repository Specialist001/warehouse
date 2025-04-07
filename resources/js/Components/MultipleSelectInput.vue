<script setup>
import { ref, computed } from "vue";

defineProps(["dataSet", "prompt"]);
const emit = defineEmits(["update:modelValue"]);

const selected = ref(null);
const isOpen = ref(false);
const searchQuery = ref("");

const filteredOptions = computed(() => {
    return searchQuery.value
        ? dataSet.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        : dataSet;
});

const selectItem = (item) => {
    selected.value = item;
    emit("update:modelValue", item.value);
    isOpen.value = false;
};

const clearSelection = () => {
    selected.value = null;
    emit("update:modelValue", "");
};
</script>

<template>
    <div class="relative w-64">
        <div
            class="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 rounded-md flex items-center justify-between cursor-pointer"
            @click="isOpen = !isOpen"
        >
            <span v-if="selected">{{ selected.label }}</span>
            <span v-else class="text-gray-400">{{ prompt || "Select an option" }}</span>
            <button v-if="selected" @click.stop="clearSelection" class="ml-2 text-gray-500 hover:text-red-500">✖</button>
        </div>
        <div
            v-if="isOpen"
            class="absolute z-10 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md mt-1 shadow-lg max-h-60 overflow-auto"
        >
            <input
                v-model="searchQuery"
                class="w-full p-2 border-b border-gray-300 dark:border-gray-700 outline-none"
                placeholder="Search..."
            />
            <ul>
                <li
                    v-for="(item, index) in filteredOptions"
                    :key="index"
                    class="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                    @click="selectItem(item)"
                >
                    {{ item.label }}
                </li>
            </ul>
        </div>
    </div>
</template>
