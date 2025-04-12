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
import Create from "@/Pages/Admin/Category/Create.vue";
import Edit from "@/Pages/Admin/Category/Edit.vue";
import Delete from "@/Pages/Admin/Category/Delete.vue";
import InfoButton from "@/Components/InfoButton.vue";
import {usePage} from "@inertiajs/vue3";
import ResourcePagination from "@/Components/ResourcePagination.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const {_, debounce, pickBy} = pkg;
const props = defineProps({
    title: String,
    filters: Object,
    categories: Object,
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
        is_active: "",
        logo: null,
        order_num: "",
        created_at: "",
    },
    selectedId: [],
    multipleSelect: false,
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
    category: null,
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
        router.get(route("admin.category.index"), params, {
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    }, 1000)
);

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
                        v-show="can(['Category Create'])"
                        class="rounded-none"
                        @click="data.createOpen = true"
                    >
                        {{ lang().button.add }}
                    </PrimaryButton>
                    <Create
                        :show="data.createOpen"
                        @close="data.createOpen = false"
                        :title="props.title"
                    />
                    <Edit
                        :show="data.editOpen"
                        @close="data.editOpen = false"
                        :category="data.category"
                        :title="props.title"
                    />
                    <Delete
                        :show="data.deleteOpen"
                        @close="data.deleteOpen = false"
                        :category="data.category"
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
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('is_active')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.is_active }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.logo }}</span>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('order_num')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.order_num }}</span>
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
                                <SelectInput
                                    class="block w-full rounded-lg size-8 text-sm font-light py-0"
                                    v-model="data.params['is_active']"
                                    :dataSet="[
                                        { value: -1, label: lang().label.all },
                                        { value: 1, label: lang().button.yes },
                                        { value: 0, label: lang().button.no }
                                    ]"
                                    :selected="data.params['is_active'] === '' ? -1 : data.params['is_active']"
                                />
                            </th>
                            <th class="px-2 pb-3"></th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model.lazy="data.params['order_num']"
                                    type="number"
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
                        <tr v-for="(category, index) in categories.data" :key="index"
                            class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30
                             hover:dark:bg-slate-900/20"
                            :class="{'bg-slate-200/30 dark:bg-slate-900/20': category.deleted_at}"
                        >
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ category.id }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ category.name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                <span :class="category.is_active === true ? 'text-green-500' : 'text-rose-500'">
                                    {{ category.is_active === true ? lang().button.yes : lang().button.no }}
                                </span>
                            </td>
                            <td class="py-4 px-2 sm:py-3">
                                <div v-if="category.logo != null" class="">
                                    <img :src="category.logo" alt="icon" class="mx-auto max-w-8 max-h-12 rounded-full"/>
                                </div>
                                <div v-else class="flex justify-center items-center">
                                    -
                                </div>
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ category.order_num }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ category.created_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ category.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                <div class="flex justify-center items-center">
                                    <div class="rounded-md overflow-hidden">
                                        <Link class="inline-flex items-center px-2 py-1.5 bg-green-600 border
                                        border-transparent font-semibold text-xs text-white uppercase
                                        tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                        dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"

                                              :href="route('admin.category.show', category?.id)"
                                              tabindex="-1">
                                            <EyeIcon class="w-4 h-4"/>
                                        </Link>
                                        <InfoButton
                                            v-show="can(['Category Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.category = category)"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <PencilIcon class="w-4 h-4"/>
                                        </InfoButton>
                                        <DangerButton
                                            v-show="can(['Category Delete'])"
                                            type="button"
                                            @click="(data.deleteOpen = true), (data.category = category)"
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
                        :links="props.categories"
                        :filters="data.params"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
</style>
