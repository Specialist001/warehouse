<script setup>

import InputLabel from "@/Components/InputLabel.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import Checkbox from "@/Components/Checkbox.vue";
import CameraSelectInput from "@/Components/CameraSelectInput.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import EmptyForm from "@/Pages/Admin/Product/EmptyForm.vue";
// import VueSelect from "vue-select";

import {
    QrCodeIcon,
    MagnifyingGlassIcon
} from "@heroicons/vue/24/solid";

import {nextTick, onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import {usePage} from "@inertiajs/vue3";
import Quagga from 'quagga';
import PrimaryButton from "@/Components/PrimaryButton.vue";
import "vue-select/dist/vue-select.css";


const props = defineProps({
    show: Boolean,
    title: String,
    form: Object,
    locales: Array,
    category_list: {
        type: Object,
        default: () => ({})
    },
    isEdit: {
        type: Boolean,
        default: false
    }
});

const linePosition = ref(0);
const lineSpeed = 2; // Скорость движения линии
let animationFrameId = null;
let direction = 1;

const activeMainTab = ref(usePage().props.locale);

const scanning = ref(false);
const scanner = ref(null);
const cameras = ref([]);
const selectedCamera = ref(null);
const currentActiveCamera = ref(null);
let videoStream = null;
let videoStreams = new Map();
const isCameraActive = ref(false);

const animateLine = () => {
    if (!scanning.value) return; // Остановить анимацию, если сканирование выключено

    const video = scanner.value;
    if (!video) {
        return;
    }

    const videoHeight = video.clientHeight;
    linePosition.value += direction * lineSpeed;

    if (linePosition.value >= videoHeight - 4 || linePosition.value <= 0) {
        direction *= -1; // Меняем направление
    }
    animationFrameId = requestAnimationFrame(animateLine);
};

// Запускаем анимацию при включении сканирования
watch(scanning, async (newVal) => {
    if (newVal) {
        await nextTick(); // Ждем, пока Vue обновит DOM

        if (!scanner.value) {
            return;
        }

        linePosition.value = 0; // Сброс линии в начало
        console.log("🔴 Сканирование запущено, старт анимации");
        animateLine();
    } else {
        console.log("⚪ Сканирование остановлено, анимация выключена");
        cancelAnimationFrame(animationFrameId);
    }
});

const initCameraSelection = async () => {
    try {
        // const devices = await Quagga.CameraAccess.enumerateVideoDevices();
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === "videoinput");

        cameras.value = videoDevices.map(device => ({
            id: device.deviceId || device.id,
            label: device.label || `Camera ${cameras.value.length + 1}`
        }));

        if (cameras.value.length > 0) {
            selectedCamera.value = cameras.value[0].id; // Выбираем первую камеру
        }
    } catch (error) {
        console.error("Ошибка получения списка камер:", error);
    }
};

// Функция остановки текущего видеопотока
const stopVideoStream = (cameraId = null) => {
    if (cameraId && videoStreams.has(cameraId)) {
        const stream = videoStreams.get(cameraId);
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
        stream.getVideoTracks()[0].stop();
        videoStreams.delete(cameraId);
        console.log(`Остановлена камера: ${cameraId}`);
    }

    if (!cameraId && videoStream) {
        // videoStream.getTracks().forEach(track => track.stop());
        videoStream.getTracks().forEach(track => {
            track.stop();
            console.log(`Остановлена камера с ID: ${currentActiveCamera.value}`);
        });
        currentActiveCamera.value = null;
        videoStream = null;
    }
};

// Запуск видеопотока вручную перед инициализацией Quagga
const startVideoStream = async () => {
    try {
        stopVideoStream(currentActiveCamera.value);
        // await new Promise(resolve => setTimeout(resolve, 500)); // Короткая задержка для безопасного переключения

        videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                deviceId: selectedCamera.value ? { exact: selectedCamera.value } : undefined
            }
        });

        if (scanner.value) {
            scanner.value.srcObject = videoStream;
            // Ждем, пока данные видео загрузятся
            await new Promise((resolve) => {scanner.value.onloadeddata = resolve;});
            if (scanner.value.paused) {
                await scanner.value.play();
            }
        }

        videoStreams.set(selectedCamera.value, videoStream);
        currentActiveCamera.value = selectedCamera.value;
        console.log(`Камера с ID ${selectedCamera.value} запущена`);
    } catch (error) {
        console.error("Ошибка запуска камеры:", error);
    }
};

const toggleScanner = async () => {
    isCameraActive.value = !isCameraActive.value;

    if (scanning.value) {
        stopScanner();
    } else {
        scanning.value = true;
        await nextTick(); // Ждём, пока Vue обновит DOM
        await startScanner();

    }
}

const startScanner = async () => {
    // await startCamera();
    scanning.value = true;
    await nextTick(); // Ждём, пока Vue обновит DOM

    // ❗ Проверяем, запущен ли уже Quagga перед остановкой
    if (Quagga.initialized) {
        console.warn("Quagga уже запущен!");
        return;
    }

    await startVideoStream(); // Запускаем видеопоток

    Quagga.init({
        inputStream: {
            // name: "Live",
            type: "LiveStream",
            target: scanner.value,
            constraints: {
                deviceId: selectedCamera.value ? { exact: selectedCamera.value } : undefined
            },
            willReadFrequently: true
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"]
        }
    }, (err) => {
        if (err) {
            console.error(err);
            scanning.value = false;
            return;
        }
        Quagga.initialized = true;
        Quagga.start();
    });

    Quagga.onDetected((data) => {
        if (!scanning.value) return; // Если уже остановлено, не сканируем

        console.log("Сканировано:", data.codeResult.code);
        props.form.barcode = data.codeResult.code;

        // Временно останавливаем Quagga, но не убиваем видеопоток
        Quagga.stop();
        Quagga.offDetected();
        Quagga.initialized = false; // Сбрасываем флаг

        setTimeout(resumeScanning, 1000); // Через 2 сек продолжаем сканирование
    });
}

// Возобновление сканирования без перезапуска камеры
const resumeScanning = () => {
    if (scanning.value) {
        if (!Quagga.initialized) {
            console.warn("Quagga не был инициализирован. Повторный запуск...");
            startScanner(); // Запускаем сканер заново, если он был отключен
        } else {
            Quagga.start();
        }
    }
};

const stopScanner = () => {
    if (Quagga.initialized) {
        Quagga.stop();
        Quagga.offDetected();
        Quagga.initialized = false; // Сбрасываем флаг
    }
    stopVideoStream();
    scanning.value = false;
}

const searchProductByBarCode = () => {
    if (!props.form.barcode) {
        return;
    }
    let barcode = props.form.barcode;
    console.log("Поиск продукта по штрихкоду:", barcode);

    try {
        axios.get(route("admin.product.searchInfoByEan", barcode))
            .then(response => {
                if (response.data.success === true) {
                    props.form.processing = false;

                    const product_data = response.data.product_data.product;
                    console.log("Данные продукта:", product_data);

                    const product_name = (product_data.name_ru ?? product_data.name) + ", " + product_data.quantity;
                    const product_description = product_name + ", " + product_data.countries;

                    props.locales.forEach(locale => {
                        props.form.name[locale] = product_name
                        props.form.description[locale] = product_description
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.error("Ошибка поиска продукта по штрихкоду:", error);
    }
}

// Переключение камеры
watch(selectedCamera, async (newCamera, oldCamera) => {
    if (oldCamera !== newCamera && isCameraActive.value) {
        // linePosition.value = 0; // При смене камеры сбрасываем линию

        console.log(`Переключение с камеры ${oldCamera} на ${newCamera}`);

        stopVideoStream(oldCamera); // Остановим только старую камеру
        await startVideoStream(); // Запустим новую камеру
        // currentActiveCamera.value = newCamera; // Запоминаем новую активную камеру
    }
});

onMounted(() => {
    initCameraSelection();
    cancelAnimationFrame(animationFrameId);
    // setInterval(generateDots, 2000);
});

</script>

<template>
    <div>
        <div v-if="form.processing">
            <EmptyForm/>
        </div>
        <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="col-span-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel for="sku" :value="lang().product.sku"/>
                            <TextInput
                                id="sku"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.sku"
                                required
                                :placeholder="lang().product.sku"
                                :error="form.errors.sku"
                            />
                            <InputError class="mt-2" :message="form.errors.sku"/>
                        </div>
                        <div>
                            <InputLabel for="price" :value="lang().label.price"/>
                            <TextInput
                                id="price"
                                type="number"
                                class="mt-1 block w-full"
                                v-model="form.price"
                                step="1" min="0"
                                required
                                :placeholder="lang().label.price"
                                :error="form.errors.price"
                            />
                            <InputError class="mt-2" :message="form.errors.price"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
                        <div>
                            <InputLabel for="category_ids" :value="lang().label.categories"/>
                            <v-select
                                multiple
                                v-model="form.category_ids"
                                :options="category_list"
                                :reduce="(option) => option.value"
                                clearable
                            />
                            <InputError class="mt-2" :message="form.errors.category_ids"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        <div class="col-span-1">
                            <div class="grid grid-cols-4 gap-2">
                                <div class="col-span-3">
                                    <InputLabel for="barcode" :value="lang().product.barcode"/>
                                    <TextInput
                                        id="barcode"
                                        type="number"
                                        class="mt-1 block w-full"
                                        v-model="form.barcode"
                                        required
                                        :placeholder="lang().product.barcode"
                                        :error="form.errors.barcode"
                                    />
                                    <!-- Кнопка сканирования -->

                                    <InputError class="mt-2" :message="form.errors.barcode"/>
                                </div>
                                <div class="col-span-1">
                                    <PrimaryButton
                                        type="button"
                                        @click="searchProductByBarCode"
                                        :disabled="!form.barcode"
                                        class="mt-6 right-2 top-2 bg-gray-300 py-2 text-gray-800 rounded h-auto float-end"
                                        style="height: 40px"
                                    >
                                        <MagnifyingGlassIcon class="h-5 w-5 "/>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <div class="grid grid-cols-4 gap-2">
                                <div class="col-span-3">
                                    <InputLabel for="camera-select" :value="lang().label.camera_list"/>
                                    <CameraSelectInput
                                        id="camera-select"
                                        class="mt-1 block w-full"
                                        v-model="selectedCamera"
                                        :dataSet="cameras"

                                        @change="startScanner"
                                    >
                                    </CameraSelectInput>
                                </div>
                                <div class="md:col-span-1">
                                    <SecondaryButton
                                        type="button"
                                        @click="toggleScanner"
                                        class="mt-6 right-2 top-2 bg-gray-300 p-2 rounded h-auto float-end"
                                        style="height: 40px"
                                    >
                                        <QrCodeIcon class="h-5 w-5"/>
                                    </SecondaryButton>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <!-- Камера для сканирования -->
                        <div v-if="scanning" class="mt-4 relative">
                            <video ref="scanner" class="w-full border rounded" autoplay></video>
                            <div class="scanner-overlay">
                                <div class="scanner-line" :style="{ top: linePosition + 'px' }"></div>
                            </div>

                        </div>
                    </div>
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
                                    <InputLabel :for="'description-' + locale"
                                                :value="lang().label.description"/>
                                    <TextInput
                                        :id="'description-' + locale"
                                        type="text"
                                        class="mt-1 block w-full"
                                        v-model="form.description[locale]"
                                        :placeholder="lang().label.description"
                                        :error="form.errors['description.' + locale]"/>
                                    <InputError class="mt-2" :message="form.errors['description.' + locale]"/>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
video {
    width: 100% !important;
    height: 130px !important;
    object-fit: cover; /* Обрезает и масштабирует видео */
}

.scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.scanner-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 0, 0, 0.8);
    box-shadow: 1px 0px 10px rgba(255, 0, 0, 0.8);
    transition: top 0.05s linear;
}
</style>
