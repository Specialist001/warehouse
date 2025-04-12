<script setup>

import {Head} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import {usePage} from "@inertiajs/vue3";
import pkg from "lodash";
import {reactive, watch} from "vue";
import Edit from "@/Pages/Admin/Product/Edit.vue";
import {PencilIcon} from "@heroicons/vue/24/solid/index.js";
import InfoButton from "@/Components/InfoButton.vue";

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    items: Object,
    categories: Object,
    breadcrumbs: Object,
});
const data = reactive({
    params: {},
    product: null,
    editOpen: false,
});


// get customer from the route
const {product} = usePage().props;

watch(() => data.editOpen, (newVal) => {

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
                        :product="data.product"
                        :title="props.title"
                        :categories="props.categories"
                    />
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="col-span-1 md:col-span-2 px-4 sm:px-0">
                <div class="space-y-4">
                    <div class="px-4 sm:px-0 ">
                        <div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                            <div
                                 :class="[
                                product.deleted_at
                                  ? 'bg-red-300'
                                  : '',
                                'px-4 py-5 sm:px-6 '
                              ]"
                            >
                                <div class="grid grid-cols-6 md:grid-cols-6 gap-4">
                                    <div class="col-span-5">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200">
                                            {{ product.name }}
                                        </h3>
                                    </div>
                                    <div class="col-span-1">
                                        <InfoButton
                                            v-show="can(['Product Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.product = product)"
                                            class="px-2 py-1.5 rounded float-right"
                                            v-tooltip="lang().product.edit"
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
                                            {{ product.id }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.name }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.name }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.description }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.description }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().product.sku }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.sku }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.price }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.price }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-100 dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().product.barcode }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.barcode }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-800 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.created_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.created_at }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-100 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.updated_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ product.updated_at }}
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 md:col-span-1 px-4 sm:px-0">
                <div class="bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200">
                            {{ lang().label.categories }}
                        </h3>
                    </div>
                    <div class="border-t border-gray-200 dark:border-slate-700">
                        <ul class="divide-y divide-gray-200 dark:divide-slate-700">
                            <li v-for="category in product.categories" :key="category.id" class="px-4 py-4 sm:px-6">
                                <div class="text-sm font-medium text-gray-700 dark:text-slate-200">
                                    {{ category.label }}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>

</style>
