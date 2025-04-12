<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {Head, Link} from "@inertiajs/vue3";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SelectInput from "@/Components/SelectInput.vue";
import {reactive, ref, watch} from "vue";
import DangerButton from "@/Components/DangerButton.vue";
import IncomeButton from "@/Components/Buttons/IncomeButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import pkg from "lodash";
import {router} from "@inertiajs/vue3";
import {
    ChevronUpDownIcon,
    PencilIcon,
    TrashIcon,
    ArrowUpTrayIcon,
    ArrowDownTrayIcon,
    EyeIcon
} from "@heroicons/vue/24/solid";
import Create from "@/Pages/Admin/WarehouseProduct/Create.vue";
import Income from "@/Pages/Admin/WarehouseProduct/Income.vue";
import Outcome from "@/Pages/Admin/WarehouseProduct/Outcome.vue";
import Delete from "@/Pages/Admin/WarehouseProduct/Delete.vue";
import InfoButton from "@/Components/InfoButton.vue";
import {usePage} from "@inertiajs/vue3";
import ResourcePagination from "@/Components/ResourcePagination.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CustomSelectInput from "@/Components/CustomSelectInput.vue";

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    filters: Object,
    warehouse_products: Object,
    warehouses: Object,
    products: Object,
    breadcrumbs: Object,
    perPage: Number,
});


const data = reactive({
    params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        warehouse_id: "",
        product_id: "",
        product_name: "",
        quantity: "",
        created_at: "",
    },
    selectedId: [],
    multipleSelect: false,
    createOpen: false,
    incomeOpen: false,
    outcomeOpen: false,
    deleteOpen: false,
    warehouse_product: null,
    transaction_type: null,
    dataSet: usePage().props.app.perpage,
});

const warehouse_list = Object.keys(props.warehouses).map(key => ({
    label: props.warehouses[key],
    value: key
}));

const order = (field) => {
    data.params.field = field;
    data.params.order = data.params.order === "asc" ? "desc" : "asc";
};

watch(
    () => _.cloneDeep(data.params),
    debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.warehouse_product.index"), params, {
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    }, 1000)
);

const selectAll = (event) => {
    if (event.target.checked === false) {
        data.selectedId = [];
    } else {
        props.warehouse_products?.data.forEach((permission) => {
            data.selectedId.push(permission.id);
        });
    }
};
const select = () => {
    data.multipleSelect = props.warehouse_products?.data.length === data.selectedId.length;
};
const startTime = ref({hours: 0, minutes: 0});
const datetime_format = 'yyyy-MM-dd HH:mm';
const locale = usePage().props.locale;
const timezone = ref({tz: 'Asia/Tashkent', offset: 5});

</script>

<template>
    <Head :title="props.title"/>

    <AuthenticatedLayout>
        <Breadcrumb :title="title" :breadcrumbs="breadcrumbs"/>
        <div class="space-y-4">
            <div class="px-4 sm:px-0">
                <div class="rounded-lg overflow-hidden w-fit">
                    <PrimaryButton
                        v-show="can(['WarehouseProduct Create'])"
                        class="rounded-none"
                        @click="data.createOpen = true"
                    >
                        {{ lang().button.add }}
                    </PrimaryButton>
                    <Create
                        :show="data.createOpen"
                        @close="data.createOpen = false"
                        :title="props.title"
                        :warehouses="props.warehouses"
                        :products="props.products"
                    />
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
                    <Delete
                        :show="data.deleteOpen"
                        @close="data.deleteOpen = false"
                        :warehouse_product="data.warehouse_product"
                        :title="props.title"
                    />
                </div>
            </div>
            <div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                <div class="flex justify-between p-2">
                    <div class="flex space-x-2">
                        <SelectInput v-model="data.params.perPage" :dataSet="data.dataSet"/>
                    </div>
                </div>
                <div class="overflow-x-auto scrollbar-table">
                    <table class="w-full">
                        <thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700">
                        <tr class="dark:bg-slate-900/50 text-left">
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('warehouse_id')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.warehouse_id }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('product_name')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.product_name }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer w-36" v-on:click="order('quantity')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.quantity }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('created_at')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.created }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('updated_at')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.updated }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 sr-only">Action</th>
                        </tr>
                        <tr>
                            <th class="px-2 pb-3">
                                <CustomSelectInput
                                    id="warehouse_id"
                                    class="block w-full"
                                    style="line-height: 14px"
                                    v-model="data.params['warehouse_id']"
                                    :dataSet="warehouse_list"
                                    :prompt="lang().label.all"
                                >
                                </CustomSelectInput>
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params['product_name']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params['quantity']"
                                    type="number"
                                    class="block w-full rounded-lg size-8"
                                    :placeholder="lang().label.quantity"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <VueDatePicker
                                    v-model="data.params.created_at" range
                                    :enable-time-picker="true"
                                    :is-24="true"
                                    :start-time="startTime"
                                    :format="datetime_format"
                                    :locale="locale === 'uz' ? 'uz-Cyrl' : locale"
                                    :teleport="true"
                                    :timezone="timezone"
                                    :input-class-name="[
                                        'border-slate-300 dark:border-slate-700 dark:bg-slate-900 ' +
                                         'dark:text-slate-300 focus:border-primary ' +
                                          'dark:focus:border-primary dark:focus:ring-primary' +
                                           ' rounded-md shadow-sm placeholder:text-slate-400' +
                                            ' placeholder:dark:text-slate-400/50 block w-full ' +
                                             'rounded-lg size-8']"
                                    :style="`padding-top:0,padding-bottom:0`"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params.updated_at"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(warehouse_product, index) in warehouse_products.data" :key="index"
                            class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30
                             hover:dark:bg-slate-900/20"
                        >
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"
                                :class="{'bg-red-600 text-white': !warehouse_product.warehouse_isset}"
                                >
                                {{ warehouse_product.warehouse_name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ props.products[warehouse_product.product_id] }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right">
                                {{ warehouse_product.quantity }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right">
                                {{ warehouse_product.created_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-right">
                                {{ warehouse_product.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                <div class="flex justify-center items-center">
                                    <div class="rounded-md overflow-hidden">
                                        <Link class="inline-flex items-center px-2 py-1.5 bg-slate-600 border
                                        border-transparent font-semibold text-xs text-white uppercase
                                        tracking-widest hover:bg-slate-500 active:bg-slate-700 focus:outline-none
                                        focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
                                        dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"
                                              :href="route('admin.warehouse_product.show', warehouse_product?.id)"
                                              tabindex="-1">
                                            <EyeIcon class="w-5 h-5"/>
                                        </Link>
                                        <IncomeButton
                                            v-show="can(['WarehouseProduct Update'])"
                                            type="button"
                                            @click="(data.incomeOpen = true), (data.warehouse_product = warehouse_product), (data.transaction_type = 'in')"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <ArrowDownTrayIcon class="w-5 h-5"/>
                                        </IncomeButton>
                                        <DangerButton
                                            v-show="can(['WarehouseProduct Update'])"
                                            type="button"
                                            @click="(data.outcomeOpen = true), (data.warehouse_product = warehouse_product), (data.transaction_type = 'out')"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.delete"
                                        >
                                            <ArrowUpTrayIcon class="w-5 h-5"/>
                                        </DangerButton>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex justify-between items-center p-2 border-t border-slate-200 dark:border-slate-700">
                    <ResourcePagination
                        :links="props.warehouse_products"
                        :filters="data.params"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
</style>
