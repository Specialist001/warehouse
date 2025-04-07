<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";

const props = defineProps({
    show: Boolean,
    title: String,
    form: Object,
    locales: Array,
    restaurants: Object,
});

</script>

<template>
    <div>
        <div class="grid grid-cols-3 gap-4">
            <div>
                <div>
                    <InputLabel for="prize_category_id" :value="lang().label.restaurant"/>
                    <CustomSelectInput
                        id="restaurant_id"
                        class="mt-1 block w-full"
                        v-model="form.restaurant_id"
                        :dataSet="restaurants"
                        :prompt="lang().category.without_restaurant_id"
                    >
                    </CustomSelectInput>
                    <InputError class="mt-2" :message="form.errors.restaurant_id"/>
                </div>
            </div>
            <div>
                <InputLabel for="order_num" :value="lang().label.order_num"/>
                <TextInput
                    id="order_num"
                    type="number"
                    class="mt-1 block w-full"
                    v-model="form.order_num"
                    step="1" min="0"
                    required
                    :placeholder="lang().label.order_num"
                    :error="form.errors.order_num"
                />
                <InputError class="mt-2" :message="form.errors.order_num"/>
            </div>
            <div>
                <InputLabel
                    for="is_active"
                    :value="lang().label.is_active"
                />
                <Checkbox
                    id="is_active"
                    v-model="form.is_active"
                    v-bind:checked="form.is_active"
                    :error="form.errors.is_active"
                />
                <InputError class="mt-2" :message="form.errors.is_active"/>
            </div>
        </div>

        <h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5">
            {{ lang().label.name }}
        </h4>
        <div class="grid grid-cols-3 gap-4 mt-1">
            <div v-for="locale in locales" :key="locale">
                <div class="col-span-1 px-4 sm:px-0">
                    <InputLabel :for="'name-' + locale" :value="locale.toUpperCase()"/>
                    <TextInput
                        :id="'name-' + locale"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.name[locale]"
                        required
                        :placeholder="lang().label.name"
                        :error="form.errors['name.' + locale]"
                    />
                    <InputError class="mt-2" :message="form.errors['name.' + locale]"/>
                </div>
            </div>
        </div>
        <h4 class="text-lg font-medium text-slate-700 dark:text-slate-100 mt-5 mb-2">
            {{ lang().label.short_description }}
        </h4>
        <div v-for="locale in locales" :key="locale">
            <div class="grid grid-cols-12 gap-2 mb-3">
                <div class="col-span-12 px-4 sm:px-0">
                    <InputLabel :for="'short_description-' + locale" :value="locale.toUpperCase()"/>
                    <TextInput
                        :id="'short_description-' + locale"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.short_description[locale]"
                        :placeholder="lang().label.short_description"
                        :error="form.errors['short_description.' + locale]"
                    />
                    <InputError class="mt-2" :message="form.errors['short_description.' + locale]"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
