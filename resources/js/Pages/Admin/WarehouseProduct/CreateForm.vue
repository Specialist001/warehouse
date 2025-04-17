<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import EmptyForm from "@/Pages/Admin/WarehouseProduct/EmptyForm.vue";
import pkg from "lodash";

const {_, debounce} = pkg;

const props = defineProps({
    show: Boolean,
    title: String,
    form: Object,
    warehouse_list: {
        type: Array,
        default: () => [],
    },
    product_list: {},
});

const filteredDestinationWarehouses = computed(() => {
    return props.warehouse_list.filter(
        (w) => w.value !== props.form.warehouse_id
    );
});

const data = ref({
    search: '',
});

const searchResults = ref([]);
const showDropdown = ref(false);

const search = debounce(async () => {
    const query = data.value.search.trim();
    if (query.length < 3) {
        searchResults.value = [];
        showDropdown.value = false;
        return;
    }

    try {
        const response = await axios.get(route("admin.product.search", {'search': query}));
        const result = response.data?.search_result ?? {};
        searchResults.value = Object.entries(result);
        showDropdown.value = true;
    } catch (error) {
        console.error(error);
        searchResults.value = [];
    }
}, 300);

function selectProduct(id, name) {
    data.value.search = name;
    props.form.product_id = id;
    showDropdown.value = false;
}

// watch if search model is empty, then clear hidden input value
watch(() => data.value.search, (newValue) => {
    if (newValue === '') {
        props.form.product_id = '';
        // clear hidden input data-product_name
        const hiddenInput = document.querySelector('input[type="hidden"][id="product_id"]');
        if (hiddenInput) {
            hiddenInput.dataset.product_name = "";
        }
    }
});

</script>

<template>
    <div>
        <div v-if="form.processing">
            <EmptyForm/>
        </div>
        <div v-else>
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-full md:col-span-1">
                    <InputLabel for="product" :value="lang().label.product"/>
                    <TextInput
                        id="product"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="data.search"
                        @input="search"
                        required
                        :placeholder="lang().label.product"
                    />
                    <InputError class="mt-2" :message="form.errors.product_id"/>
                </div>
                <div class="col-span-full md:col-span-1">
                    <div class="">
                        <ul
                            v-if="showDropdown && searchResults.length"
                            class="absolute z-10 w-72 lg:w-60 max-h-48 overflow-y-auto bg-white border mt-0 md:mt-6 rounded shadow"
                        >
                            <li
                                v-for="[id, name] in searchResults"
                                :key="id"
                                @click="selectProduct(id, name)"
                                class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {{ name }}
                            </li>
                        </ul>
<!--                        <InputLabel for="product_id" :value="lang().label.product_id"/>-->
                        <TextInput
                            id="product_id"
                            type="hidden"
                            class="mt-1 block w-full"
                            v-model="form.product_id"
                            :data-product_name="data.search"
                            required
                        />
                    </div>

                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-5">
                <div class="col-span-full md:col-span-1">
                    <!-- Иначе текстовое поле -->
                    <div>
                        <InputLabel for="source" :value="lang().transaction.source"/>
                        <TextInput
                            id="source"
                            v-model="form.source"
                            required
                            type="text"
                            class="mt-1 block w-full"
                            :error="form.errors.source"
                        />
                        <InputError class="mt-2" :message="form.errors.source"/>
                    </div>
                </div>

                <div class="col-span-full md:col-span-1">
                    <InputLabel for="quantity" :value="lang().label.quantity"/>
                    <TextInput
                        id="quantity"
                        type="number"
                        min="1"
                        step="1"
                        class="mt-1 block w-full"
                        v-model="form.quantity"
                        required
                        :placeholder="lang().placeholder.quantity"
                        :error="form.errors.quantity"
                    />
                    <InputError class="mt-2" :message="form.errors.quantity"/>
                </div>
                <div class="col-span-full md:col-span-1">
                    <div class="">
                        <InputLabel for="warehouse_id" :value="lang().label.warehouse"/>
                        <CustomSelectInput
                            id="warehouse_id"
                            class="mt-1 block w-full"
                            v-model="form.warehouse_id"
                            required
                            :dataSet="warehouse_list"
                        >
                        </CustomSelectInput>
                        <InputError class="mt-2" :message="form.errors.warehouse_id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
ul::-webkit-scrollbar {
    width: 6px;
}
ul::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}
</style>
