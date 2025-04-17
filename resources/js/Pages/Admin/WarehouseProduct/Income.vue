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
    warehouse_product: Object,
    warehouses: Object,
    products: Object,
});

const emit = defineEmits(["close"]);

const form = useForm({
    warehouse_id: "",
    product_id: "",
    product_name: "",
    receive_quantity: "",
    destination: "",
    source: "",
    type: "in",
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

const update = () => {
    form.put(route("admin.warehouse_product.update", props.warehouse_product?.id), {
        preserveScroll: true,
        onSuccess: () => {
            emit("close");
            form.reset();
        },
        onError: (e) => {
            form.processing = false;
            console.log(e);
        },
        onFinish: () => {
            form.processing = false;
        },
    });
};

const edit = () => {
    axios.get(route("admin.warehouse_product.edit", props.warehouse_product?.id))
        .then(response => {
            if (response.data.success === true) {
                form.processing = false;

                const warehouse_product = response.data.warehouse_product;
                // mass assign warehouse_product data to form
                Object.keys(form).forEach(key => {
                    if (warehouse_product[key] !== undefined) {
                        form[key] = warehouse_product[key];
                    }
                });
                form.send_quantity = warehouse_product.quantity;
            }
        })
        .catch(error => {
            console.log(error);
            form.reset();
        });

};

watchEffect(() => {
    if (props.show) {
        form.errors = {};

        // route to edit warehouse_product
        edit();
    } else {
        form.reset();
        // form submit button is disabled
        form.processing = true;
    }
});
</script>

<template>
    <section class="space-y-6">
        <Modal :show="props.show" @close="emit('close')" :max-width="`4xl`">
            <form class="p-6" @submit.prevent="update">
                <h2 class="text-lg font-medium text-slate-900 dark:text-slate-100">
                    {{ props.title }}
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
                        @click="update"
                    >
                        {{
                            form.processing
                                ? lang().button.save + "..."
                                : lang().button.save
                        }}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    </section>
</template>
