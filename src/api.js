
export async function requestPermissionNotification() {
  const permisionResult = await Notification.requestPermission()
  // console.log('permission',permisionResult)
  return permisionResult
}


export async function sendPush(subscription,msg) {
   
   // Send Push Notification
    console.log("Sending Push...");
    await fetch(`${URI_SERVER}/api/subscribe`, {
      method: "POST",
      body: JSON.stringify({subs:subscription,msg:msg}),
      headers: {
        // 'Access-Control-Allow-Origin':'*',
        "content-type": "application/json"
      }
    });
    // console.log("Push Sent...",JSON.stringify({subs:subscription,msg:msg}));
}

export async function getPushSubscription(){ 
  // Register Service Worker
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
  
   
    return subscription
}

export const URI_SERVER='https://fierce-inlet-32650.herokuapp.com'
// export const URI_SERVER='http://localhost:5000'
// export const URI_SERVER='http://127.0.0.1:5000'
// export const URI_SERVER='https://glistening-kashata-d8f9a6.netlify.app'