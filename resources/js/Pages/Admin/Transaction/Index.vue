<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {Head, Link, router, usePage} from "@inertiajs/vue3";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import TextInput from "@/Components/TextInput.vue";
import SelectInput from "@/Components/SelectInput.vue";
import {reactive, ref, watch} from "vue";
import DangerButton from "@/Components/DangerButton.vue";
import pkg from "lodash";
import {ChevronUpDownIcon, DocumentArrowDownIcon, EyeIcon, PencilIcon, TrashIcon,} from "@heroicons/vue/24/solid";
import Edit from "@/Pages/Admin/Transaction/Edit.vue";
import Delete from "@/Pages/Admin/Transaction/Delete.vue";
import InfoButton from "@/Components/InfoButton.vue";
import ResourcePagination from "@/Components/ResourcePagination.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import {ArrowDownTrayIcon, ArrowUpTrayIcon} from "@heroicons/vue/24/solid/index.js";

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    filters: Object,
    transactions: Object,
    warehouses: Object,
    status_list: Object,
    breadcrumbs: Object,
    perPage: Number,
});

const selectedFileType = ref('Xlsx')

const data = reactive({
    params: {
        search: props.filters.search,
        field: props.filters.field,
        order: props.filters.order,
        perPage: props.perPage,
        id: "",
        warehouse_id: "",
        executor_id: "",
        product_name: "",
        type: "",
        quantity: "",
        status: "",
        is_internal_transfer: "",
        source: "",
        destination: "",
        created_at: "",
        file_type: selectedFileType.value,
    },
    selectedId: [],
    multipleSelect: false,
    editOpen: false,
    deleteOpen: false,
    transaction: null,
    dataSet: usePage().props.app.perpage,
});

const warehouse_list = Object.keys(props.warehouses).map(key => ({
    label: props.warehouses[key],
    value: key
}));

const status_dropdown = Object.keys(props.status_list).map(key => ({
    label: props.status_list[key],
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
        router.get(route("admin.transaction.index"), params, {
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
        props.transactions?.data.forEach((permission) => {
            data.selectedId.push(permission.id);
        });
    }
};
const select = () => {
    data.multipleSelect = props.transactions?.data.length === data.selectedId.length;
};
const startTime = ref({hours: 0, minutes: 0});
const datetime_format = 'yyyy-MM-dd HH:mm';
const locale = usePage().props.locale;
const timezone = ref({tz: 'Asia/Tashkent', offset: 5});

function exportData() {
    const params = {
        ...props.filters,
        file_type: selectedFileType.value,
    }
    window.location.href = route("admin.transaction.export") + '?' + new URLSearchParams(params).toString()
}

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
                        :transaction="data.transaction"
                        :title="props.title"
                        :status_list="props.status_list"
                    />
                    <Delete
                        :show="data.deleteOpen"
                        @close="data.deleteOpen = false"
                        :transaction="data.transaction"
                        :title="props.title"
                    />
                </div>
            </div>
            <div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                <div class="flex justify-between p-2">
                    <div class="flex space-x-2">
                        <SelectInput v-model="data.params.perPage" :dataSet="data.dataSet"/>
                    </div>
                    <div class="flex space-x-2">
                        <select v-model="selectedFileType"
                                class="border border-gray-300 w-36 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800">
                            <option value="Xlsx">Excel (XLSX)</option>
                            <option value="Xls">Excel (XLS)</option>
                            <option value="Csv">CSV</option>
                            <option value="Html">HTML</option>
                        </select>
                        <InfoButton
                            @click="exportData"
                            class="px-2 py-1.5 rounded"
                        >
                            <DocumentArrowDownIcon class="w-4 h-4 mr-2"/>{{ lang().label.export }}
                        </InfoButton>
                    </div>
                </div>
                <div class="overflow-x-auto scrollbar-table">
                    <table class="w-full">
                        <thead class="uppercase text-sm border-t border-slate-200 dark:border-slate-700">
                        <tr class="dark:bg-slate-900/50 text-left">
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('id')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.id }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
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
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('type')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.type }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('quantity')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.quantity }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('status')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.status }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('is_internal_transfer')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().transaction.is_internal_transfer }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('source')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().transaction.source }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('destination')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().transaction.destination }}</span>
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
                                <TextInput
                                    v-model.lazy="data.params['id']"
                                    type="number"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
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
                                <CustomSelectInput
                                    id="type"
                                    class="block w-full"
                                    style="line-height: 14px"
                                    v-model="data.params['type']"
                                    :dataSet="[
                                        // { value: -1, label: lang().label.all },
                                        { value: `in`, label: lang().transaction.type_income },
                                        { value: `out`, label: lang().transaction.type_outcome }
                                    ]"
                                    :prompt="lang().label.all"
                                >
                                </CustomSelectInput>
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
                                <CustomSelectInput
                                    id="status"
                                    class="block w-full"
                                    style="line-height: 14px"
                                    v-model="data.params['status']"
                                    :dataSet="status_dropdown"
                                    :prompt="lang().label.all"
                                >
                                </CustomSelectInput>
                            </th>
                            <th class="px-2 pb-3">
                                <CustomSelectInput
                                    id="is_internal_transfer"
                                    class="block w-full"
                                    style="line-height: 14px"
                                    v-model="data.params['is_internal_transfer']"
                                    :dataSet="[
                                        // { value: -1, label: lang().label.all },
                                        { value: 1, label: lang().button.yes },
                                        { value: 0, label: lang().button.no },
                                    ]"
                                    :prompt="lang().label.all"
                                >
                                </CustomSelectInput>
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params['source']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params['destination']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
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
                        <tr v-for="(transaction, index) in transactions.data" :key="index"
                            class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30
                             hover:dark:bg-slate-900/20"
                            :class="{'bg-slate-200/30 dark:bg-slate-900/20': transaction.deleted_at}"
                        >
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ transaction.id }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left"
                                :class="{'bg-red-300 text-dark': !transaction.warehouse_isset}"
                            >
                                {{ transaction.warehouse_name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ transaction.product_name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                <template v-if="transaction.type === 'in'">
                                    <span class="text-green-500">
                                        <ArrowDownTrayIcon class="w-7 h-7 mx-auto"/>
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="text-rose-500">
                                        <ArrowUpTrayIcon class="w-7 h-7 mx-auto"/>
                                    </span>
                                </template>
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ transaction.quantity }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left font-bold">
                                <template v-if="transaction.status === 'completed'">
                                    <span class="text-green-500">{{ lang().transaction.status_completed }}</span>
                                </template>
                                <template v-else-if="transaction.status === 'pending'">
                                    <span class="text-yellow-500">{{ lang().transaction.status_pending }}</span>
                                </template>
                                <template v-else-if="transaction.status === 'cancelled'">
                                    <span class="text-rose-500">{{ lang().transaction.status_cancelled }}</span>
                                </template>
                                <template v-else>
                                    <span class="text-rose-500">{{ lang().warehouse.status_unknown }}</span>
                                </template>
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ transaction.is_internal_transfer }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ transaction.source }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ transaction.destination }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ transaction.created_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ transaction.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                <div class="flex justify-center items-center">
                                    <div class="rounded-md overflow-hidden">
                                        <Link class="inline-flex items-center px-2 py-1.5 bg-green-600 border
                                        border-transparent font-semibold text-xs text-white uppercase
                                        tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                        dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"

                                              :href="route('admin.transaction.show', transaction?.id)"
                                              tabindex="-1">
                                            <EyeIcon class="w-4 h-4"/>
                                        </Link>
                                        <InfoButton
                                            v-show="can(['Transaction Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.transaction = transaction)"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <PencilIcon class="w-4 h-4"/>
                                        </InfoButton>
                                        <DangerButton
                                            v-show="can(['Transaction Delete'])"
                                            type="button"
                                            @click="(data.deleteOpen = true), (data.transaction = transaction)"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.delete"
                                        >
                                            <TrashIcon class="w-4 h-4"/>
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
                        :links="props.transactions"
                        :filters="data.params"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
</style>
