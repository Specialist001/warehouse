<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm, usePage} from "@inertiajs/vue3";
import {watchEffect} from "vue";
import CategoryForm from "@/Pages/Admin/Category/CategoryForm.vue";

const props = defineProps({
    show: Boolean,
    title: String,
});

// get locales from use page props
const locales = usePage().props.locales;

const emit = defineEmits(["close"]);

const form = useForm({
    restaurant_id: "",
    name: Object.fromEntries(locales.map(locale => [locale, ""])),
    short_description: Object.fromEntries(locales.map(locale => [locale, ""])),
    is_active: true,
    logo: null,
    order_num: 0,
});

const create = () => {
    form.post(route("admin.category.store"), {
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
                    {{ lang().label.add }} {{ lang().label.category }}
                </h2>
                <div class="my-6 space-y-4">
                    <CategoryForm
                        :form="form"
                        :locales="locales"
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
