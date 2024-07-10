import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
      <ToastContainer position="top-left" autoClose={2000} stacked={true} />
		<Routes />
	</React.StrictMode>
);

// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
// });

// const showInstallPromotion = () => {
//   const installButton = document.getElementById('install-button');
//   if (installButton) {
//     installButton.style.display = 'block';
//     installButton.addEventListener('click', () => {
//       // Show the install prompt
//       deferredPrompt.prompt();
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         } else {
//           console.log('User dismissed the install prompt');
//         }
//         // Clear the deferredPrompt so it can be garbage collected
//         deferredPrompt = null;
//         // Hide the install button
//         installButton.style.display = 'none';
//       });
//     });
//   }
// };