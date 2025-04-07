<script setup>
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import {useForm, usePage} from "@inertiajs/vue3";
import {ref, watchEffect} from "vue";
import CategoryForm from "@/Pages/Admin/Category/CategoryForm.vue";

const locales = usePage().props.locales;

const props = defineProps({
    show: Boolean,
    title: String,
    category: Object,
    locales: Array,
    restaurants: {
        type: Object,
        default: () => ({}) // Provide an empty object as default
    },
});

const restaurants = Object.keys(props.restaurants).map(key => ({
    label: props.restaurants[key],
    value: key
}));

const emit = defineEmits(["close"]);

const form = useForm({
    restaurant_id: "",
    name: Object.fromEntries(locales.map(locale => [locale, ""])),
    short_description: Object.fromEntries(locales.map(locale => [locale, ""])),
    is_active: true,
    logo: null,
    order_num: 0,
});

const update = () => {
    form.put(route("admin.category.update", props.category?.id), {
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
    axios.get(route("admin.category.edit", props.category?.id))
        .then(response => {
            if (response.data.success === true) {
                form.processing = false;

                const category = response.data.category;
                // mass assign category data to form
                Object.keys(form).forEach(key => {
                    if (category[key] !== undefined) {
                        form[key] = category[key];
                    }
                });

                locales.forEach(locale => {
                    form.name[locale] = category.name[locale];
                    form.short_description[locale] = category.short_description[locale];
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

        // route to edit category
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
                    <CategoryForm
                        :form="form"
                        :locales="locales"
                        :restaurants="restaurants"
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
