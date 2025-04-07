<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import {Head, Link, useForm, usePage} from "@inertiajs/vue3";
import AuthenticationIllustrationForCabinet from "@/Components/AuthenticationIllustrationForCabinet.vue";
import {ref} from "vue";

defineProps({
    canResetPassword: Boolean,
    status: String,
});
// set props canResetPassword to false
const canResetPassword = false;

// get telegram_bot_name from page props
const telegram_bot_name = usePage().props.telegram_bot_name;

const form = useForm({
    email: "",
    password: "",
    remember: false,
    phone: "",
    otp_code: "",
});

const isEmailAuth = ref(true);

const submit = () => {
    const routeName = isEmailAuth.value ? "cabinet.auth.login.store" : "cabinet.auth.otp.store";
    form.post(route(routeName), {
        onFinish: (e) => {
            console.log("finish", e);
            // form.reset("password");
        },
        onSuccess: (e) => {
            console.log("success", e);
            // form.reset("password");
        },
        onError: (e) => {
            console.log("error", e);
            // form.reset("password");
        },
    });
};

const toggleAuthMethod = () => {
    isEmailAuth.value = !isEmailAuth.value;
};

</script>

<template>
    <GuestLayout>
        <Head :title="lang().label.cabinet_login" />
        <template #illustration>
            <AuthenticationIllustrationForCabinet type="login" class="w-72 h-auto" />
        </template>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div v-if="isEmailAuth">
                <div>
                    <InputLabel for="email" :value="lang().label.email" />
                    <TextInput
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.email"
                        required
                        autofocus
                        autocomplete="username"
                        :placeholder="lang().placeholder.email"
                        :error="form.errors.email"
                    />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password" :value="lang().label.password" />
                    <TextInput
                        id="password"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                        :placeholder="lang().placeholder.password"
                        :error="form.errors.password"
                    />
                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="block mt-4">
                    <label class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span
                            class="ml-2 text-sm text-slate-600 dark:text-slate-400"
                        >{{ lang().label.remember_me }}</span
                        >
                    </label>
                </div>
            </div>
            <div v-else>
                <div>
                    <InputLabel for="phone" :value="lang().label.phone" />
                    <TextInput
                        id="phone"
                        type="text"
                        class="mt-1 block w-64"
                        v-model="form.phone"
                        required
                        autofocus
                        autocomplete="tel"
                        :placeholder="lang().placeholder.phone"
                        :error="form.errors.phone"
                    />
                    <InputError class="mt-2" :message="form.errors.phone" />
                </div>

                <div class="mt-4 flex items-center">
                    <InputLabel for="otp_code" :value="lang().label.otp_code" />
                    <TextInput
                        id="otp_code"
                        type="text"
                        class="mt-1 block w-40"
                        v-model="form.otp_code"
                        required
                        autocomplete="one-time-code"
                        :placeholder="lang().placeholder.otp_code"
                        :error="form.errors.otp_code"
                    />
                    <a
                        :href="`https://t.me/${telegram_bot_name}`"
                        target="_blank"
                        class="ms-4 inline-flex items-center px-4 py-2.5 h-10 bg-primary dark:bg-primary
                        border border-transparent rounded-md font-semibold text-xs text-white
                         dark:text-white uppercase tracking-widest
                         hover:bg-primary/80 dark:hover:bg-primary/90 focus:bg-primary/80
                         dark:focus:bg-primary/80 active:bg-primary dark:active:bg-primary/80
                          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                           dark:focus:ring-offset-primary transition ease-in-out duration-150
                           disabled:bg-primary/80"
                    >
                        OTP
                    </a>
                </div>
            </div>

            <div class="flex items-center justify-between mt-8 ">
                <PrimaryButton
                    class="float-right"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{
                        form.processing
                            ? lang().button.login + "..."
                            : lang().button.login
                    }}
                </PrimaryButton>
            </div>
        </form>
        <div class="mt-4">
            <button @click="toggleAuthMethod" class="underline text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800">
                {{ isEmailAuth ? lang().auth.via_bot : lang().auth.via_email }}
            </button>
        </div>
    </GuestLayout>
</template>
