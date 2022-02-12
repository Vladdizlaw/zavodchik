console.log("Service Worker Loaded...");

self.addEventListener("push",async e => {
  const data = e.data.json();
  console.log("Push Recieved...",data);
  try{
   await  self.registration.showNotification(data.title, {
        body: "Welcome to Zavodchick"})
    
  // self.registration.showNotification(data.title, {
  //   body: "Notified by Traversy Media!",
    
  // 
  console.log('done with notification')
}catch(e){
  console.log(e)
}
});