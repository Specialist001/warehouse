<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import {computed, onMounted, ref, watch} from "vue";

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

</script>

<template>
    <div>
        <div class="grid grid-cols-3 gap-4">
            <div class="col-span-full md:col-span-1">
                <div class="">
                    <InputLabel for="product_id" :value="lang().label.product_id"/>

                    <CustomSelectInput
                        id="product_id"
                        class="mt-1 block w-full"
                        v-model="form.product_id"
                        required
                        disabled="disabled"
                        :dataSet="product_list"
                    >
                    </CustomSelectInput>
                    <InputError class="mt-2" :message="form.errors.product_id"/>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-5">
            <div class="col-span-full md:col-span-1">
                <!-- Иначе текстовое поле -->
                <div>
                    <InputLabel for="source" :value="lang().transaction.source" />
                    <TextInput
                        id="source"
                        v-model="form.source"
                        required
                        type="text"
                        class="mt-1 block w-full"
                    />
                    <InputError :message="form.errors.source" />
                </div>
            </div>

            <div class="col-span-full md:col-span-1">
                <InputLabel for="receive_quantity" :value="lang().label.quantity"/>
                <TextInput
                    id="receive_quantity"
                    type="number"
                    min="1"
                    step="1"
                    class="mt-1 block w-full"
                    v-model="form.receive_quantity"
                    required
                    :placeholder="lang().placeholder.quantity"
                    :error="form.errors.receive_quantity"
                />
                <InputError class="mt-2" :message="form.errors.receive_quantity"/>
            </div>
            <div class="col-span-full md:col-span-1">
                <div class="">
                    <InputLabel for="warehouse_id" :value="lang().transaction.source"/>
                    <CustomSelectInput
                        id="warehouse_id"
                        class="mt-1 block w-full"
                        v-model="form.warehouse_id"
                        required
                        disabled="disabled"
                        :dataSet="warehouse_list"
                    >
                    </CustomSelectInput>
                    <InputError class="mt-2" :message="form.errors.warehouse_id"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
