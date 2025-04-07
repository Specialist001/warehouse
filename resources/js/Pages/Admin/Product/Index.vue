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
import Create from "@/Pages/Admin/Product/Create.vue";
import Edit from "@/Pages/Admin/Product/Edit.vue";
import Delete from "@/Pages/Admin/Product/Delete.vue";
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
    products: Object,
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
        description: "",
        sku: null,
        price: "",
        barcode: "",
        created_at: "",
        updated_at: "",
    },
    selectedId: [],
    multipleSelect: false,
    createOpen: false,
    editOpen: false,
    deleteOpen: false,
    product: null,
    dataSet: usePage().props.app.perpage,
});

const order = (field) => {
    data.params.field = field;
    data.params.order = data.params.order === "asc" ? "desc" : "asc";
};

const category_list = Object.keys(props.categories).map(key => ({
    label: props.categories[key],
    value: key
}));

watch(
    () => _.cloneDeep(data.params),
    debounce(() => {
        let params = pickBy(data.params);
        router.get(route("admin.product.index"), params, {
            replace: true,
            preserveState: true,
            preserveScroll: true,
        });
    }, 1000)
);

const startTime = ref({hours: 0, minutes: 0});
const datetime_format = 'yyyy-MM-dd HH:mm';
const locale = usePage().props.locale;

const tz = usePage().props.timezone.name;
const tz_offset = usePage().props.timezone.offset;

const timezone = ref({tz: tz, offset: tz_offset});

</script>

<template>
    <Head :title="props.title"/>

    <AuthenticatedLayout>
        <Breadcrumb :title="title" :breadcrumbs="breadcrumbs"/>
        <div class="space-y-4">
            <div class="px-4 sm:px-0">
                <div class="rounded-lg overflow-hidden w-fit">
                    <PrimaryButton
                        v-show="can(['Product Create'])"
                        class="rounded-none"
                        @click="data.createOpen = true"
                    >
                        {{ lang().button.add }}
                    </PrimaryButton>
                    <Create
                        :show="data.createOpen"
                        @close="data.createOpen = false"
                        :title="props.title"
                        :categories="props.categories"
                    />
                    <Edit
                        :show="data.editOpen"
                        @close="data.editOpen = false"
                        :product="data.product"
                        :title="props.title"
                        :categories="props.categories"
                    />
                    <Delete
                        :show="data.deleteOpen"
                        @close="data.deleteOpen = false"
                        :product="data.product"
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
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('sku')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().product.sku }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('price')">
                                <div class="flex justify-between items-right">
                                    <span>{{ lang().label.price }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('barcode')">
                                <div class="flex justify-between items-right">
                                    <span>{{ lang().product.barcode }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('created_at')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.created_at }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 cursor-pointer" v-on:click="order('updated_at')">
                                <div class="flex justify-between items-center">
                                    <span>{{ lang().label.updated_at }}</span>
                                    <ChevronUpDownIcon class="w-4 h-4"/>
                                </div>
                            </th>
                            <th class="px-2 py-4 sr-only">Action</th>
                        </tr>
                        <tr>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model.lazy="data.params['id']"
                                    type="text"
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
                                    v-model.lazy="data.params['sku']"
                                    type="text"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model.lazy="data.params['price']"
                                    type="number"
                                    class="block w-full rounded-lg size-8"
                                />
                            </th>
                            <th class="px-2 pb-3">
                                <TextInput
                                    v-model.lazy="data.params['barcode']"
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
                                    style="line-height: 14px"
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
                        <tr v-for="(product, index) in products.data" :key="index"
                            class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/30
                             hover:dark:bg-slate-900/20"
                            :class="{'bg-red-500/30 dark:bg-red-900/20 hover:bg-red-500/30 dark:hover:bg-red-900/20':product.deleted_at}"
                        >
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ product.id }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-left">
                                {{ product.name }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ product.sku }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ product.price }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3 text-center">
                                {{ product.barcode }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ product.created_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                {{ product.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 px-2 sm:py-3">
                                <div class="flex justify-center items-center">
                                    <div class="rounded-md overflow-hidden">
                                        <Link class="inline-flex items-center px-2 py-1.5 bg-green-600 border
                                        border-transparent font-semibold text-xs text-white uppercase
                                        tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none
                                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                        dark:focus:ring-offset-slate-800 transition ease-in-out duration-150"

                                              :href="route('admin.product.show', product?.id)"
                                              tabindex="-1">
                                            <EyeIcon class="w-4 h-4"/>
                                        </Link>
                                        <InfoButton
                                            v-show="can(['Product Update'])"
                                            type="button"
                                            @click="(data.editOpen = true), (data.product = product)"
                                            class="px-2 py-1.5 rounded-none"
                                            v-tooltip="lang().tooltip.edit"
                                        >
                                            <PencilIcon class="w-4 h-4"/>
                                        </InfoButton>
                                        <DangerButton
                                            v-show="can(['Product Delete'])"
                                            type="button"
                                            @click="(data.deleteOpen = true), (data.product = product)"
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
                        :links="props.products"
                        :filters="data.params"
                    />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
input.dp__pointer {
    line-height: 14px;
}
</style>
