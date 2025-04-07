<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import SelectInput from "@/Components/SelectInput.vue";

const props = defineProps({
    show: Boolean,
    title: String,
    form: Object,
    status_list: Object,
});

</script>

<template>
    <div>
        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-2">
                <InputLabel for="name" :value="lang().label.name"/>
                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    :placeholder="lang().placeholder.name"
                    :error="form.errors.name"
                />
                <InputError class="mt-2" :message="form.errors.name"/>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-3">
            <div class="col-span-3">
                <InputLabel for="location" :value="lang().label.address"/>
                <TextInput
                    id="location"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.location"
                    required
                    :error="form.errors.location"
                />
                <InputError class="mt-2" :message="form.errors.location"/>
            </div>
            <div class="">
                <InputLabel for="status" :value="lang().label.status"/>

                <SelectInput
                    id="role"
                    class="mt-1 block w-full"
                    v-model="form.status"
                    required
                    :dataSet="status_list"
                >
                </SelectInput>
                <InputError class="mt-2" :message="form.errors.status"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
