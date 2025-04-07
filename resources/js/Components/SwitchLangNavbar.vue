<script setup>
import {Link} from "@inertiajs/vue3";
import {usePage} from "@inertiajs/vue3";
import DropdownLink from "../Components/DropdownLink.vue";
import {CheckBadgeIcon, ChevronDownIcon, GlobeAltIcon} from "@heroicons/vue/24/solid";
import Dropdown from "../Components/Dropdown.vue";

const lang = usePage().props.locale;
const locales = usePage().props.locales;
const is_dropdown_lang_selector = true;
</script>

<template>
    <div v-if="is_dropdown_lang_selector" class="relative inline-block text-left">
        <Dropdown align="right" width="48">
            <template #trigger>
                <span class="inline-flex rounded-md">
                    <button
                        type="button"
                        class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out sm:hidden">
                        <GlobeAltIcon class="h-5 w-5"/>
                    </button>
                    <button
                        type="button"
                        class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out truncate w-fit hidden sm:inline-flex">
                        <span class="flex justify-between items-center">
                            {{ lang.toUpperCase() }}
                        </span>
                        <ChevronDownIcon
                            class="ml-2 h-5 w-5 fill-current"
                        />
                    </button>
                </span>
            </template>

            <template #content>
                <div v-for="locale in locales" :key="locale">
                    <DropdownLink
                        :href="route('setLang.set', locale)"
                        class="dark:text-white text-gray-500 block px-4 py-2 text-sm hover:bg-red-500 hover:dark:bg-red-500"
                        role="menuitem"
                        :class="{ 'bg-red-500': locale === lang }"
                    >
                        {{ locale.toUpperCase() }}
                    </DropdownLink>
                </div>
            </template>
        </Dropdown>
    </div>
    <div v-else>
        <span
            v-tooltip="lang == 'ru' ? 'uz' : 'ru'"
            class="hover:text-slate-400 hover:bg-slate-900 focus:bg-slate-900 focus:text-slate-400 inline-flex items-center justify-center p-2 rounded-md lg:hover:text-slate-500 dark:hover:text-slate-400 lg:hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none lg:focus:bg-slate-100 dark:focus:bg-slate-900 lg:focus:text-slate-500 dark:focus:text-slate-400 transition duration-150 ease-in-out"
        >
            <Link
                v-if="lang == 'ru'"
                :href="route('setLang.set', 'uz')"
                class="flex items-center space-x-2"
            >
                <span class="w-5 h-5 fill-current"> UZ </span>
            </Link>
            <Link
                v-if="lang == 'uz'"
                :href="route('setLang.set', 'ru')"
                class="flex items-center space-x-2"
            >
                <span class="w-5 h-5 fill-current"> RU </span>
            </Link>
        </span>
    </div>
</template>
