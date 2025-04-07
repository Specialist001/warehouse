<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm, usePage} from "@inertiajs/vue3";
import {computed, reactive, watchEffect} from "vue";
import ProductForm from "@/Pages/Admin/Product/Form.vue";

const locales = usePage().props.locales;

const props = defineProps({
    show: Boolean,
    title: String,
    product: Object,
    categories: Object,
    locales: Array,
});

const category_list = Object.keys(props.categories).map(key => ({
    label: props.categories[key],
    value: key
}));

const emit = defineEmits(["close"]);

const form = useForm({
    name: Object.fromEntries(locales.map(locale => [locale, ""])),
    description: Object.fromEntries(locales.map(locale => [locale, ""])),
    price: null,
    sku: null,
    barcode: null,
    category_ids: [],
});

const normalizedCategoryIds = computed(() => {
    return form.category_ids.map(item => (typeof item === "object" ? item.value : item));
});

const update = () => {
    form.category_ids = normalizedCategoryIds.value;

    form.put(route("admin.product.update", props.product?.id), {
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
    axios.get(route("admin.product.edit", props.product?.id))
        .then(response => {
            if (response.data.success === true) {
                form.processing = false;

                const product = response.data.product;
                // mass assign product data to form
                Object.keys(form).forEach(key => {
                    if (product[key] !== undefined) {
                        form[key] = product[key];
                    }
                });

                console.log(form.category_ids);

                locales.forEach(locale => {
                    form.name[locale] = product.name[locale];
                    form.description[locale] = product.description[locale];
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

        // route to edit product
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
                    {{ lang().product.edit }}
                </h2>
                <div class="my-6 space-y-4">
                    <ProductForm
                        :form="form"
                        :locales="locales"
                        :isEdit="true"
                        :category_list="category_list"
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
