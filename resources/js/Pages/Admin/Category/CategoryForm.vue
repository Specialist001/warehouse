<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CustomSelectInput from "@/Components/CustomSelectInput.vue";
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";

const props = defineProps({
    show: Boolean,
    title: String,
    form: Object,
    locales: Array,
});

const activeMainTab = ref(usePage().props.locale);

</script>

<template>
    <div>
        <div class="grid grid-cols-3 gap-4">
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
            {{ lang().label.names }}
        </h4>
        <div class="grid grid-cols-1 gap-4 mt-1">
            <!-- Навигационные вкладки -->
            <ul class="flex border-b">
                <template v-for="locale in locales" :key="locale">
                    <li class="-mb-px mr-1">
                        <a href="javascript:void(0);"
                           @click="activeMainTab = locale"
                           :class="activeMainTab === locale ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'"
                           class="inline-block py-2 px-4 font-semibold border-b-2 cursor-pointer">
                            {{ locale }}
                        </a>
                    </li>
                </template>
            </ul>

            <!-- Контент вкладок -->
            <div class="py-3">
                <template v-for="locale in locales" :key="locale">
                    <div v-show="activeMainTab === locale">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div class="col-pan-1 sm:col-span-1 sm:px-0">
                                <InputLabel :for="'name-' + locale" :value="lang().label.name"/>
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
                            <div class="col-pan-1 sm:col-span-2 sm:px-0">
                                <InputLabel :for="'short_description-' + locale"
                                            :value="lang().label.short_description"/>
                                <TextInput
                                    :id="'short_description-' + locale"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.short_description[locale]"
                                    :placeholder="lang().label.short_description"
                                    :error="form.errors['short_description.' + locale]"/>
                                <InputError class="mt-2" :message="form.errors['short_description.' + locale]"/>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
