<script setup>
import { router } from "@inertiajs/vue3";
import { pickBy } from "lodash";
import { reactive, watchEffect } from "vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    links: Object,
    filters: Object,
});

const data = reactive({
    params: {
        search: props.filters?.search,
        field: props.filters?.field,
        order: props.filters?.order,
        perPage: props.filters?.perPage,
    },
});

const goto = (link) => {
    let params = pickBy(data.params);
    router.get(link, params, {
        replace: true,
        preserveState: true,
        preserveScroll: true,
    });
};

watchEffect(() => {
    data.params.search = props.filters?.search;
    data.params.field = props.filters?.field;
    data.params.order = props.filters?.order;
    data.params.perPage = props.filters?.perPage;
});
</script>
<template>
    <div class="ml-2" v-if="links.data.length != 0">
        {{ links.meta.from }}-{{ links.meta.to }} {{ lang().label.of }} {{ links.meta.total }}
    </div>
    <div
        class="flex flex-col space-y-2 mx-auto p-6 text-lg"
        v-if="links.data.length == 0"
    >
        <Icon :name="'nodata'" class="w-auto h-16" />
        <p>{{ lang().label.no_data }}</p>
    </div>
    <div v-if="links.meta.links.length > 1">
        <ul
            class="flex justify-center items-center rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
        >
            <li>
                <button
                    v-on:click="goto(links.links.prev)"
                    class="px-4 py-2"
                    v-html="'&laquo;'"
                    :disabled="links.links.prev == null"
                ></button>
            </li>
            <li>
                <p
                    class="px-4 py-2 bg-primary text-white"
                    v-html="links.meta.current_page"
                ></p>
            </li>
            <li>
                <button
                    v-on:click="goto(links.links.next)"
                    class="px-4 py-2"
                    v-html="'&raquo;'"
                    :disabled="links.links.next == null"
                ></button>
            </li>
        </ul>
    </div>
</template>
