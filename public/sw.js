console.log("Service Worker Loaded...");

self.addEventListener("push",async e => {
  const data = e.data.json();
  console.log("Push Recieved...",data);
  try{
   await  self.registration.showNotification(data.title, {
        body: data.body})
    
  
  console.log('done with notification')
}catch(e){
  console.log(e)
}
});