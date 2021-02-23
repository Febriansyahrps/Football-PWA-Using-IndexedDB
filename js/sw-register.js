if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser");
} else {
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('/../service-worker.js')
        .then(function(registration) {
            console.log('registrasi ServiceWorker berhasil')
            return registration;
        })
        .catch(function(err) {
            console.error(`registrasi ServiceWorker gagal ${err}`)
        });
}

function requestPermission() {
    if('Notification' in window) {
        navigator.serviceWorker.ready.then(() => {
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BOVQk3BTLPPn0ueZk0YJDriQFYRxqvxVk1AByuWdJry78A5FHuNlksWiPtQTpmnRdR3eGiiz-qzaVkO1Gibvrds")
                    })
                    .then(function(subscribe) {
                        console.log(`berhasil melakukan subcribe dengan endpoint: ${subscribe.endpoint}`);
                        console.log(`berhasil melakukan subcribe dengan p256dh key: ${btoa(String.fromCharCode.apply
                            (null, new Uint8Array(subscribe.getKey('p256dh'))))}`);
                        console.log(`berhasil melakukan subscribe dengan auth key: ${btoa(String.fromCharCode.apply
                            (null, new Uint8Array(subscribe.getKey('auth'))))}`);
                    })
                    .catch(function(e) {
                        console.error(`tidak dapat melakukan subscribe ${e.message}`);
                    });
                });
            }
        })
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}