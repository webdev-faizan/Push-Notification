self.addEventListener("push", (e) => {
  const { title, body } = e.data.json();
  self.registration.showNotification(title, {
    dir: "rtl",
    body: body,
    icon: "your-notification-icon.png",
  });
});
