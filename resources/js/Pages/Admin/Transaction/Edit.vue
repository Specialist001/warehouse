<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm} from "@inertiajs/vue3";
import {watchEffect} from "vue";
import TransactionForm from "@/Pages/Admin/Transaction/Form.vue";

const props = defineProps({
    show: Boolean,
    title: String,
    transaction: Object,
    status_list: {
        type: Object,
        default: () => ({}),
    }
});

const status_list = Object.keys(props.status_list).map(key => ({
    label: props.status_list[key],
    value: key
}));

const emit = defineEmits(["close"]);

const form = useForm({
    status: "",
});

const update = () => {
    form.put(route("admin.transaction.update", props.transaction?.id), {
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
    axios.get(route("admin.transaction.edit", props.transaction?.id))
        .then(response => {
            if (response.data.success === true) {
                form.processing = false;

                const transaction = response.data.transaction;
                // mass assign transaction data to form
                Object.keys(form).forEach(key => {
                    if (transaction[key] !== undefined) {
                        form[key] = transaction[key];
                    }
                });
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

        // route to edit transaction
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
                    {{ lang().label.edit }} {{ props.title }}
                </h2>
                <div class="my-6 space-y-4">
                    <TransactionForm
                        :form="form"
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
