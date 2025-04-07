<script setup>

</script>

<template>
    <div class="grid grid-cols-3 gap-4 animate-pulse">
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
    </div>

    <h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5">
        {{ lang().label.names }}
    </h4>

    <div class="grid grid-cols-1 gap-4 mt-1 animate-pulse">
        <ul class="flex border-b">
            <li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li>
            <li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li>
            <li class="-mb-px mr-1 h-8 w-24 bg-gray-300 rounded"></li>
        </ul>

        <div class="py-3">
            <div class="grid grid-cols-3 md:grid-cols-3 gap-4">
                <div class="col-span-1 px-4 sm:px-0">
                    <div class="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                    <div class="h-10 bg-gray-300 rounded w-full"></div>
                </div>
                <div class="col-span-2 px-4 sm:px-0">
                    <div class="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                    <div class="h-10 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
