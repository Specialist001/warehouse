<script setup>

import {Head} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import {usePage} from "@inertiajs/vue3";
import pkg from "lodash";
import {reactive, watch} from "vue";
import Edit from "@/Pages/Admin/Warehouse/Edit.vue";
import {PencilIcon} from "@heroicons/vue/24/solid/index.js";
import InfoButton from "@/Components/InfoButton.vue";

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    items: Object,
    breadcrumbs: Object,
    status_list: Object,
});
const data = reactive({
    params: {},
    warehouse: null,
    editOpen: false,
});

// get customer from the route
const {warehouse} = usePage().props;

watch(() => data.editOpen, (newVal) => {
    if (!newVal) {
        // Object.assign(data, usePage().props);
        // reload the page
        location.reload();
    }
});


</script>

<template>
    <Head :title="props.title"/>

    <AuthenticatedLayout>
        <Breadcrumb :title="title" :breadcrumbs="breadcrumbs"/>
        <div class="space-y-4">
            <div class="px-4 sm:px-0">
                <div class="rounded-lg overflow-hidden w-fit">
                    <Edit
                        :show="data.editOpen"
                        @close="data.editOpen = false"
                        :warehouse="data.warehouse"
                        :title="props.title"
                        :status_list="props.status_list"
                    />
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="col-span-2 md:px-4 sm:px-0">
                <div class="space-y-4">
                    <div class="px-4 sm:px-0">
                        <div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                            <div class="px-4 py-5 sm:px-6">
                                <div class="grid grid-cols-6 md:grid-cols-6 gap-4">
                                    <div class="col-span-5">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200">
                                            {{ warehouse.name }}

                                        </h3>
                                    </div>
                                    <div class="col-span-1">
                                        <InfoButton
                                            v-show="can(['Warehouse Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.warehouse = warehouse)"
                                            class="px-2 py-1.5 rounded float-right"
                                            v-tooltip="lang().label.edit"
                                        >
                                            <PencilIcon class="w-4 h-4"/>
                                        </InfoButton>
                                    </div>
                                </div>


                            </div>
                            <div class="border-t border-gray-200 dark:border-slate-700">
                                <div>
                                    <div
                                        class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            ID
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse.id }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.address }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse.location }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.status }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            <template v-if="warehouse.status === 'active'">
                                                <span class="text-green-500">{{
                                                        lang().warehouse.status_active
                                                    }}</span>
                                            </template>
                                            <template v-else-if="warehouse.status === 'inactive'">
                                                <span class="text-rose-500">{{ lang().warehouse.status_inactive }}</span>
                                            </template>
                                            <template v-else>
                                                <span class="text-rose-500">{{
                                                        lang().warehouse.status_unknown
                                                    }}</span>
                                            </template>
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.created_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse.created_at }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.updated_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse.updated_at }}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
</template>

<style scoped>

</style>
