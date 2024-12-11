import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { auth } from "./firebase.js";
import { loginCheck } from "./loginCheck.js";

import './signupForm.js'
import './signinForm.js'
import './logout.js'



// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
  } else {
    loginCheck(user);
  }
});