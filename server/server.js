import bodyParser from "body-parser";
import express from "express";
import webpush from "web-push";
import cors from "cors";
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
// const vapidKeys = webpush.generateVAPIDKeys();
const PUBLIC_VAPID_KEY =
  "BJsspjPm6h2oXHm2-vD0ajndRsHqk4uaqDOjh4iOD3Eegf1Vt9VJuM0LMCo4KrWR2EKcmJcg9jVCPwScpF6LvQk";
const PRIVATE_VAPID_KEY = "TglRio0DGnlQIGoDhM1wwTeElwMRiVT1shk85fX3Qrg";
webpush.setVapidDetails(
  "mailto:test@gmail.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);
app.use(express.static("../client"));
app.post("/subscribe", (req, resp) => {
  const subscription = req.body;
  // const subscription = {
  //   endpoint:
  //     "https://fcm.googleapis.com/fcm/send/cCbKikBcGP8:APA91bELzGZ9cIibLEuP3wkMGkdYwg-0AUqoFzhJQWBVAiS7npKsPdOovnZAJzKjaUFDf7B2850fRxMfIwOB10hhsD2dKXa1rLsXiPOYuSjlJRAWLGisXG5j1Oq-fsitut35s6CGinEn",
  //   expirationTime: null,
  //   keys: {
  //     p256dh:
  //       "BMgXmJMxUwG3OuocXqIiQ12hCbW3D3dpAi0qbAwkuEbceYowzeZhMOd7d1RnApA9nxaXpmU88c8vSgAUrNWPJDw",
  //     auth: "umgpDytuNVZ7PVKFd-xBEA",
  //   },
  // };
  const payload = JSON.stringify({
    title: "toasty",
    body: "you have new message",
  });
  webpush.sendNotification(subscription, payload).catch((error) => {
    console.log(error);
  });
  resp.end();
});
app.listen(2000, () => {
  console.log("server is lisning port http://localhost:2000");
});
