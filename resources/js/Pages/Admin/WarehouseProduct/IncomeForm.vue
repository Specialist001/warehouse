<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import EmptyForm from "@/Pages/Admin/WarehouseProduct/EmptyForm.vue";

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
                        v-model="form.product_name"
                        :disabled="true"
                        required
                        :placeholder="lang().label.product"
                    />
                    <InputError class="mt-2" :message="form.errors.product_id"/>
                </div>
                <div class="col-span-full md:col-span-1">
                    <div class="">
                        <TextInput
                            id="product_id"
                            type="hidden"
                            class="mt-1 block w-full"
                            v-model="form.product_id"
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-5">
                <div class="col-span-full md:col-span-1">
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
                    <div v-if="is_create">
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
                    <div v-else>
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
                </div>
                <div class="col-span-full md:col-span-1">
                    <div class="">
                        <InputLabel for="warehouse_id" :value="lang().transaction.source"/>
                        <CustomSelectInput
                            id="warehouse_id"
                            class="mt-1 block w-full"
                            v-model="form.warehouse_id"
                            required
                            :disabled="props.is_create!==true"
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
</style>
