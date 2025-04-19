<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm, usePage} from "@inertiajs/vue3";
import {watchEffect} from "vue";
import WarehouseForm from "@/Pages/Admin/Warehouse/WarehouseForm.vue";

const props = defineProps({
    show: Boolean,
    title: String,
    status_list: {
        type: Object,
        default: () => ({}),
    }
});

const status_list = Object.keys(props.status_list).map(key => ({
    label: props.status_list[key],
    value: key
}));

// get locales from use page props
const locales = usePage().props.locales;

const emit = defineEmits(["close"]);

const form = useForm({
    name: "",
    location: "",
    status: "",
});

const create = () => {
    form.post(route("admin.warehouse.store"), {
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
                    {{ lang().label.add }} {{ lang().label.warehouse }}
                </h2>
                <div class="my-6 space-y-4">
                    <WarehouseForm
                        :form="form"
                        :locales="locales"
                        :status_list="status_list"
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
