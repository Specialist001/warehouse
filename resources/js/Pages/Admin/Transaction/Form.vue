<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
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
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
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
    </div>
</template>

<style scoped>

</style>
