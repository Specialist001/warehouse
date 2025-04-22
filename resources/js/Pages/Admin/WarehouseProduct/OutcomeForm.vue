<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import {computed, onMounted, ref, watch} from "vue";
import EmptyForm from "@/Pages/Admin/WarehouseProduct/EmptyForm.vue";
import TextInputGroup from "@/Components/TextInputGroup.vue";

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

// watch for quantity change, if input quantity is greater form.quantity, show error
watch(() => props.form.quantity, (newValue, oldValue) => {
    if (newValue > props.form.quantity) {
        props.form.errors.quantity = "Quantity cannot be greater than the available quantity";
    } else {
        props.form.errors.quantity = "";
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
                <div class="col-span-full md:col-span-1">
                    <div>
                        <Checkbox
                            id="is_internal_transfer"
                            v-model="form.is_internal_transfer"
                            :label="lang().transaction.is_internal_transfer"
                        />
                        <label for="is_internal_transfer" class="ml-2 font-medium text-sm text-slate-600 dark:text-slate-400" >
                            {{ lang().transaction.is_internal_transfer }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-5">
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
                <div class="col-span-full md:col-span-1">
                    <InputLabel for="send_quantity" :value="lang().label.quantity"/>
                    <TextInputGroup
                        id="send_quantity"
                        type="number"
                        min="1"
                        class="mt-1 block w-full"
                        v-model="form.send_quantity"
                        :unit="form.product_unit"
                        required
                        :placeholder="lang().placeholder.quantity"
                        :error="form.errors.send_quantity"
                    />
                    <InputError class="mt-2" :message="form.errors.send_quantity"/>
                </div>
                <div class="col-span-full md:col-span-1">
                    <div v-if="form.is_internal_transfer">
                        <InputLabel for="destination_warehouse_id" :value="lang().transaction.destination" />
                        <CustomSelectInput
                            class="mt-1 block w-full"
                            id="destination_warehouse_id"
                            v-model="form.destination"
                            required
                            :dataSet="filteredDestinationWarehouses"
                            :prompt="lang().warehouse.select"
                        />
                        <InputError :message="form.errors.destination" />
                    </div>

                    <!-- Иначе текстовое поле -->
                    <div v-else>
                        <InputLabel for="destination" :value="lang().transaction.destination" />
                        <TextInput
                            id="destination"
                            v-model="form.destination"
                            required
                            type="text"
                            class="mt-1 block w-full"
                        />
                        <InputError :message="form.errors.destination" />
                    </div>


                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
