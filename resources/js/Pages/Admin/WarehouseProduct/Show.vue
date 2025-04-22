<script setup>

import {Head} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import {usePage} from "@inertiajs/vue3";
import pkg from "lodash";
import {reactive, watch} from "vue";
import Income from "@/Pages/Admin/WarehouseProduct/Income.vue";
import Outcome from "@/Pages/Admin/WarehouseProduct/Outcome.vue";
import {ArrowDownTrayIcon, ArrowUpTrayIcon, PencilIcon} from "@heroicons/vue/24/solid/index.js";
import IncomeButton from "@/Components/Buttons/IncomeButton.vue";
import DangerButton from "@/Components/DangerButton.vue";

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    items: Object,
    breadcrumbs: Object,
    warehouses: Object,
    products: Object,
});
const data = reactive({
    params: {},
    warehouse_product: null,
    editOpen: false,
});

// get customer from the route
const {warehouse_product} = usePage().props;

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
                    <Income
                        :show="data.incomeOpen"
                        @close="data.incomeOpen = false"
                        :warehouse_product="data.warehouse_product"
                        :title="lang().transaction.type_income"
                        :warehouses="props.warehouses"
                        :products="props.products"
                    />
                    <Outcome
                        :show="data.outcomeOpen"
                        @close="data.outcomeOpen = false"
                        :warehouse_product="data.warehouse_product"
                        :title="lang().transaction.type_outcome"
                        :warehouses="props.warehouses"
                        :products="props.products"
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
                                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                    <div class="col-span-2 md:col-span-4 lg:col-span-4">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-200">
                                            {{ warehouse_product.product_name }}

                                        </h3>
                                    </div>
                                    <div class="col-span-2 md:col-span-1 lg:col-span-2 sm:text-right">
                                        <IncomeButton
                                            v-show="can(['WarehouseProduct Update'])"
                                            type="button"
                                            @click="(data.incomeOpen = true), (data.warehouse_product = warehouse_product), (data.transaction_type = 'in')"
                                            class="px-2 py-1.5 rounded-l-md rounded-r-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <ArrowDownTrayIcon class="w-6 h-6 lg:w-5 lg:h-5"/>
                                        </IncomeButton>
                                        <DangerButton
                                            v-show="can(['WarehouseProduct Update'])"
                                            type="button"
                                            @click="(data.outcomeOpen = true), (data.warehouse_product = warehouse_product), (data.transaction_type = 'out')"
                                            class="px-2 py-1.5 rounded-r-md rounded-l-none"
                                            v-tooltip="lang().tooltip.delete"
                                        >
                                            <ArrowUpTrayIcon class="w-6 h-6 lg:w-5 lg:h-5"/>
                                        </DangerButton>
                                    </div>
                                </div>


                            </div>
                            <div class="border-t border-gray-200 dark:border-slate-700">
                                <div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            ID
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.id }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.warehouse_id }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.warehouse_id }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.warehouse }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.warehouse_name }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.product_id }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.product_id }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.product }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.product_name }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-white dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.created_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.created_at }}
                                        </dd>
                                    </div>
                                    <div
                                        class="bg-gray-50 dark:bg-slate-900 px-4 py-2.5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500 dark:text-slate-400">
                                            {{ lang().label.updated_at }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">
                                            {{ warehouse_product.updated_at }}
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
