// import axios from 'axios'
// export function registerServiceWorker() {
//   navigator.serviceWorker.register("/sw.js").then(
//     function(registration) {
//       console.log("ServiceWorker registration successful", registration);
//     },
//     function(err) {
//       console.log("ServiceWorker registration failed: ", err);
//     }
//   );
// }
export async function requestPermissionNotification() {
  const permisionResult = await Notification.requestPermission()
  // console.log('permission',permisionResult)
  return permisionResult
}
export async function subscribeUserToPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    alert("serviceWorker or PushManager not support");
  } else {
    
    navigator.serviceWorker.register("/sw.js").then(
      function(swReg) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey:'BEPqvuktWmX8TmOryua_KvfXb9lLTwV4CwMwSsTBYiet0qnkAYC4Se8R-zFq9_YWUGjKlhjsjiKO96yURd6h1Jc'
            
        };
        const reg = swReg.pushManager.subscribe(subscribeOptions).then(
          function(pushSubscription) {
            console.log(pushSubscription)
            return pushSubscription
          },
          function(error) {
            console.log(error);
          }
        );
        console.log(reg);
        return reg
      },
      function(err) {
        console.log(err);
      }
      
    );
  }
}
// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
export async function sendPush(subscription,msg) {
    // Register Service Worker
  
    await fetch("http://localhost:5000/api/subscribe", {
      method: "POST",
      body: JSON.stringify({subs:subscription,msg:msg}),
      headers: {
        "content-type": "application/json"
      }
    });
    // console.log("Push Sent...",JSON.stringify({subs:subscription,msg:msg}));
}

export async function getPushSubscription(){
  const publicVapidKey='BEPqvuktWmX8TmOryua_KvfXb9lLTwV4CwMwSsTBYiet0qnkAYC4Se8R-zFq9_YWUGjKlhjsjiKO96yURd6h1Jc'
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
    console.log("Service Worker Registered...");
  
    // Register Push
    console.log("Registering Push...")
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:publicVapidKey
    });
    console.log("Push Registered...");
  
    // Send Push Notification
    console.log("Sending Push...");
    return subscription
}
