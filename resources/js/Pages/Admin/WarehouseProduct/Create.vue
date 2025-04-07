<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm} from "@inertiajs/vue3";
import {watchEffect} from "vue";
import WarehouseProductIncomeForm from "@/Pages/Admin/WarehouseProduct/IncomeForm.vue";

const props = defineProps({
    show: Boolean,
    title: String,
    warehouses: Object,
    products: Object,
});

const emit = defineEmits(["close"]);

const form = useForm({
    warehouse_id: "",
    destination_warehouse_id: "",
    product_id: "",
    quantity: "",
    destination: "",
    source: "",
    type: "",
    is_internal_transfer: false,
});


const warehouse_list = Object.keys(props.warehouses).map(key => ({
    label: props.warehouses[key],
    value: key
}));

const product_list = Object.keys(props.products).map(key => ({
    label: props.products[key],
    value: key
}));

const create = () => {
    form.post(route("admin.warehouse_product.store"), {
        preserveScroll: true,
        onSuccess: () => {
            emit("close");
            form.reset();
        },
        onError: () => null,
        onFinish: () => null,
    });
};

watchEffect(() => {
    if (props.show) {
        form.errors = {};
    }
});
</script>

<template>
    <section class="space-y-6">
        <Modal :show="props.show" @close="emit('close')" :max-width="`4xl`">
            <form class="p-6" @submit.prevent="create">
                <h2
                    class="text-lg font-medium text-slate-900 dark:text-slate-100"
                >
                    {{ lang().label.add }} {{ lang().label.warehouse_product }}
                </h2>
                <div class="my-6 space-y-4">
                    <WarehouseProductIncomeForm
                        :form="form"
                        :warehouse_list="warehouse_list"
                        :product_list="product_list"
                    />
                </div>
                <div class="flex justify-end">
                    <SecondaryButton :disabled="form.processing" @click="emit('close')">
                        {{ lang().button.close }}
                    </SecondaryButton>
                    <PrimaryButton
                        class="ml-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="create"
                    >
                        {{
                            form.processing
                                ? lang().button.add + "..."
                                : lang().button.add
                        }}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    </section>
</template>
