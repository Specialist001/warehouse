<script setup>
import Breadcrumb from "../Components/Breadcrumb.vue";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.vue";
import {
    ChevronRightIcon,
    KeyIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/vue/24/solid";
import {Head, Link} from "@inertiajs/vue3";

const props = defineProps({
    users: Number,
    customers: Number,
    roles: Number,
    permissions: Number,
    warehouses: Number,
    products: Number,
    transactions: Number,
});
</script>

<template>
    <Head title="Dashboard"/>
    <AuthenticatedLayout>
        <Breadcrumb :title="'Dashboard'" :breadcrumbs="[]"/>
        <div class="space-y-4">
            <div class="text-white dark:text-slate-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 overflow-hidden shadow-sm">
                <div v-show="can(['read user'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-blue-600/70 dark:bg-blue-500/80 items-center overflow-hidden">
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">{{ props.users }}</p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.user }}
                            </p>
                        </div>
                        <div>
                            <UserIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-blue-600 dark:bg-blue-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-blue-600/90 dark:hover:bg-blue-600/70"
                    >
                        <Link :href="route('admin.user.index')" class="flex justify-between items-center">
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
                <div v-show="can(['read role'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-green-600/70 dark:bg-green-500/80 items-center overflow-hidden"
                    >
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">{{ props.roles }}</p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.role }}
                            </p>
                        </div>
                        <div>
                            <KeyIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-green-600 dark:bg-green-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-green-600/90 dark:hover:bg-green-600/70"
                    >
                        <Link
                            :href="route('admin.role.index')"
                            class="flex justify-between items-center"
                        >
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
                <div v-show="can(['read permission'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-amber-600/70 dark:bg-amber-500/80 items-center overflow-hidden"
                    >
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">
                                {{ props.permissions }}
                            </p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.permission }}
                            </p>
                        </div>
                        <div>
                            <ShieldCheckIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-amber-600 dark:bg-amber-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-amber-600/90 dark:hover:bg-amber-600/70"
                    >
                        <Link
                            :href="route('admin.permission.index')"
                            class="flex justify-between items-center"
                        >
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
                <div v-show="can(['Warehouse List'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-blue-600/70 dark:bg-blue-500/80 items-center overflow-hidden">
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">{{ props.warehouses }}</p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.warehouses }}
                            </p>
                        </div>
                        <div>
                            <ChevronRightIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-blue-600 dark:bg-blue-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-blue-600/90 dark:hover:bg-blue-600/70"
                    >
                        <Link :href="route('admin.warehouse.index')" class="flex justify-between items-center">
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
                <div v-show="can(['Product List'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-lime-500/70 dark:bg-lime-400/80 items-center overflow-hidden">
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">{{ props.products }}</p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.products }}
                            </p>
                        </div>
                        <div>
                            <ChevronRightIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-lime-600 dark:bg-lime-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-lime-600/90 dark:hover:bg-lime-600/70"
                    >
                        <Link :href="route('admin.product.index')" class="flex justify-between items-center">
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
                <div v-show="can(['Transaction List'])">
                    <div
                        class="rounded-t-none sm:rounded-t-lg px-4 py-6 flex justify-between bg-green-500/70 dark:bg-green-400/80 items-center overflow-hidden">
                        <div class="flex flex-col">
                            <p class="text-4xl font-bold">{{ props.transactions }}</p>
                            <p class="text-md md:text-lg uppercase">
                                {{ lang().label.transactions }}
                            </p>
                        </div>
                        <div>
                            <ChevronRightIcon class="w-16 h-auto"/>
                        </div>
                    </div>
                    <div
                        class="bg-green-600 dark:bg-green-600/80 rounded-b-none sm:rounded-b-lg p-2 overflow-hidden hover:bg-green-600/90 dark:hover:bg-green-600/70"
                    >
                        <Link :href="route('admin.transaction.index')" class="flex justify-between items-center">
                            <p>{{ lang().label.more }}</p>
                            <ChevronRightIcon class="w-5 h-5"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
