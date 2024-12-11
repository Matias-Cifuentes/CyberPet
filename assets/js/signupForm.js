import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Close the signup modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // reset the form
    signUpForm.reset();

    // show welcome message
    showMessage("Bienvenido!: " + userCredential.user.email);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email en uso", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email invalido", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Contraseña debil", "error")
    } else if (error.code) {
      showMessage("Algo malió sal", "error")
    }
  }

});