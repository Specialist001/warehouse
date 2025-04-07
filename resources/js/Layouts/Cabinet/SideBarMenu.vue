<script setup>
import {
    HomeIcon,
    UserIcon,
    CheckBadgeIcon,
    KeyIcon,
    ShieldCheckIcon,
    ListBulletIcon,
    GiftIcon,
    ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import {
    GiftIcon as GiftIconOutline,
    GiftTopIcon as GiftTopIconOutline,
    BanknotesIcon as BanknotesIconOutline,
    CalendarDaysIcon as CalendarDaysIconOutline,
} from "@heroicons/vue/24/outline";
import {Link} from "@inertiajs/vue3";
</script>
<template>
    <div class="text-slate-300 pt-5 pb-20">
        <div class="flex justify-center">
            <div
                class="rounded-full flex items-center justify-center bg-red-700 text-slate-300 w-24 h-24 text-4xl uppercase">
                {{
                    $page.props.auth.user.name
                        .match(/(^\S\S?|\b\S)?/g)
                        .join("")
                        .match(/(^\S|\S$)?/g)
                        .join("")
                }}
            </div>
        </div>
        <div class="text-center py-3 px-4 border-b border-slate-700 dark:border-slate-800">
            <span class="flex items-center justify-center">
                <p class="truncate text-md">{{ $page.props.auth.user.name }}</p>
                <div>
                    <CheckBadgeIcon
                        class="ml-[2px] w-4 h-4"
                        v-show="$page.props.auth.user.email_verified_at"
                    />
                </div>
            </span>
            <span class="block text-sm font-medium truncate">{{
                    $page.props.auth.user.roles[0].name
                }}</span>
        </div>
        <ul class="space-y-2 my-4">
            <li class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('cabinet.dashboard') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('cabinet.dashboard')" class="flex items-center py-2 px-4">
                    <HomeIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.dashboard }}</span>
                </Link>
            </li>
            <li v-show="can(['Category List'])" class="py-2">
                <p>{{ lang().label.data }}</p>
            </li>
            <li v-show="can(['Warehouse List'])"
                class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('cabinet.restaurant.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('cabinet.restaurant.index')" class="flex items-center py-2 px-4">
                    <UserIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.restaurants }}</span>
                </Link>
            </li>
            <li v-show="can(['Category List'])"
                class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('cabinet.category.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('cabinet.category.index')" class="flex items-center py-2 px-4">
                    <UserIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.categories }}</span>
                </Link>
            </li>
            <li v-show="can(['Dish List'])"
                class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('cabinet.dish.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('cabinet.dish.index')" class="flex items-center py-2 px-4">
                    <UserIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.dishes }}</span>
                </Link>
            </li>
            <li v-show="can(['Employee List'])" class="py-2">
                <p>{{ lang().label.data }}</p>
            </li>
            <li v-show="can(['Employee List'])"
                class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('cabinet.employee.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('cabinet.employee.index')" class="flex items-center py-2 px-4">
                    <UserIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().restaurant.employees }}</span>
                </Link>
            </li>

            <li v-show="can(['read role', 'read permission'])" class="py-2">
                <p>{{ lang().label.access }}</p>
            </li>
            <li v-show="can(['read role'])"
                class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('admin.role.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('admin.role.index')" class="flex items-center py-2 px-4">
                    <KeyIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.role }}</span>
                </Link>
            </li>
            <li v-show="can(['read permission'])" class="text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-500"
                v-bind:class="route().current('admin.permission.index') ? 'bg-red-500' : 'bg-slate-700/40 dark:bg-slate-800/40'">
                <Link :href="route('admin.permission.index')" class="flex items-center py-2 px-4">
                    <ShieldCheckIcon class="w-6 h-5"/>
                    <span class="ml-3">{{ lang().label.permission }}</span>
                </Link>
            </li>
        </ul>
    </div>
</template>
