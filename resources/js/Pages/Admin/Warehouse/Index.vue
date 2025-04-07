<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import {Head, Link} from "@inertiajs/vue3";
import Breadcrumb from "@/Components/Breadcrumb.vue";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SelectInput from "@/Components/SelectInput.vue";
import {reactive, ref, watch} from "vue";
import DangerButton from "@/Components/DangerButton.vue";
import pkg from "lodash";
import {router} from "@inertiajs/vue3";
import {
    ChevronUpDownIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon
} from "@heroicons/vue/24/solid";
import Create from "@/Pages/Admin/Warehouse/Create.vue";
import Edit from "@/Pages/Admin/Warehouse/Edit.vue";
import Delete from "@/Pages/Admin/Warehouse/Delete.vue";
import InfoButton from "@/Components/InfoButton.vue";
import {usePage} from "@inertiajs/vue3";
import ResourcePagination from "@/Components/ResourcePagination.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    filters: Object,
    warehouses: Object,
    status_list: Object,
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
        name: "",
        location: "",
        status: "",
        created_at: "",
    },
    selectedId: [],
    multipleSelect: false,
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
    warehouse: null,
    dataSet: usePage().props.app.perpage,
});

const order = (field) => {
    data.params.field = field;
    data.params.order = data.params.order === "asc" ? "desc" : "asc";
};

watch(
    () => _.cloneDeep(data.params),
    debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.warehouse.index"), params, {
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
        props.warehouses?.data.forEach((permission) => {
            data.selectedId.push(permission.id);
        });
    }
};
const select = () => {
    data.multipleSelect = props.warehouses?.data.length === data.selectedId.length;
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
                        v-show="can(['Warehouse Create'])"
                        class="rounded-none"
                        @click="data.createOpen = true"
                    >
                        {{ lang().button.add }}
                    </PrimaryButton>
                    <Create
                        :show="data.createOpen"
                        @close="data.createOpen = false"
                        :title="props.title"
                        :status_list="props.status_list"
                    />
                    <Edit
                        :show="data.editOpen"
                        @close="data.editOpen = false"
                        :warehouse="data.warehouse"
                        :title="props.title"
                        :status_list="props.status_list"
                    />
                    <Delete
                        :show="data.deleteOpen"
                        @close="data.deleteOpen = false"
                        :warehouse="data.warehouse"
                        :title="props.title"
                    />
                </div>
            </div>
            <div class="relative bg-white dark:bg-slate-800 shadow sm:rounded-lg">
                <div class="flex justify-between p-2">
                    <div class="flex space-x-2">
                        <SelectInput v-model="data.params.perPage" :dataSet="data.dataSet"/>
                    </div>
                    <TextInput
                        v-model="data.params.search"
                        type="text"
                        class="block w-3/6 md:w-2/6 lg:w-1/6 rounded-lg"
                        :placeholder="lang().placeholder.search"
                    />
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
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('name')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.name }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('location')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.address }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('status')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.status }}</span>
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
                                <TextInput
                                    v-model="data.params['name']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model="data.params['location']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                    :placeholder="lang().label.address"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <SelectInput
                                    class="block w-24 rounded-lg size-8 font-light py-0"
                                    v-model="data.params['status']"
                                    :dataSet="[
                                        { value: -1, label: lang().label.all },
                                        { value: `active`, label: lang().warehouse.status_active },
                                        { value: `inactive`, label: lang().warehouse.status_inactive },
                                    ]"
                                    :selected="data.params['status'] === '' ? -1 : data.params['status']"
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
                        <tr v-for="(warehouse, index) in warehouses.data" :key="index"
                            class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30
                             hover:dark:bg-slate-900/20"
                            :class="{'bg-slate-200/30 dark:bg-slate-900/20': warehouse.deleted_at}"
                        >
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ warehouse.id }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ warehouse.name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ warehouse.location }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                <template v-if="warehouse.status === 'active'">
                                    <span class="text-green-500">{{ lang().warehouse.status_active }}</span>
                                </template>
                                <template v-else-if="warehouse.status === 'inactive'">
                                    <span class="text-rose-500">{{ lang().warehouse.status_inactive }}</span>
                                </template>
                                <template v-else>
                                    <span class="text-rose-500">{{ lang().warehouse.status_unknown }}</span>
                                </template>
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ warehouse.created_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ warehouse.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                <div class="flex justify-center items-center">
                                    <div class="rounded-md overflow-hidden">
                                        <Link class="inline-flex items-center px-2 py-1.5 bg-green-600 border
                                        border-transparent font-semibold text-xs text-white uppercase
                                        tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                        dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"

                                              :href="route('admin.warehouse.show', warehouse?.id)"
                                              tabindex="-1">
                                            <EyeIcon class="w-4 h-4"/>
                                        </Link>
                                        <InfoButton
                                            v-show="can(['Warehouse Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.warehouse = warehouse)"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <PencilIcon class="w-4 h-4"/>
                                        </InfoButton>
                                        <DangerButton
                                            v-show="can(['Warehouse Delete'])"
                                            type="button"
                                            @click="(data.deleteOpen = true), (data.warehouse = warehouse)"
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
                        :links="props.warehouses"
                        :filters="data.params"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
/*@import '@vuepic/vue-datepicker/dist/main.css';*/
</style>
