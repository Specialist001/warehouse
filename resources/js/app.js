import "./bootstrap";
import "../css/app.css";
import "floating-vue/dist/style.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/index";
import FloatingVue from "floating-vue";
import { usePage } from "@inertiajs/vue3";
import vSelect from "vue-select";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(FloatingVue)
            .component("v-select", vSelect)
            .mixin({
                methods: {
                    can: function (permissions) {
                        let allPermissions = this.$page.props.auth.can;
                        let hasPermission = false;
                        permissions.forEach(function (item) {
                            if (allPermissions[item]) hasPermission = true;
                        });
                        return hasPermission;
                    },
                    lang: function () {
                        return usePage().props.language.original;
                    },
                },
            })
            .mount(el);
    },
    progress: {
        color: "#ea1715",
    },
});
