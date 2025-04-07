<script setup>
import {onMounted} from "vue";

const emit = defineEmits(["file-selected"]);

const openFileManager = () => {
    window.open('/laravel-filemanager?type=image', 'FileManager', 'width=900,height=600');
};

onMounted(() => {
    window.addEventListener("message", (event) => {
        if (event.data.fileUrl) {
            emit("file-selected", event.data.fileUrl);
            // window.opener.postMessage(event.data.fileUrl, "*");
            window.close();
        }
    });
});
</script>

<template>
    <button type="button" @click="openFileManager" class="p-2 bg-blue-500 text-white rounded">
        Выбрать файл
    </button>
</template>

<style scoped>
</style>
