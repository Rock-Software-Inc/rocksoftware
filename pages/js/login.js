import * as pacman from "../../assets/js/pacman.js";
import { Notyf } from "https://cdn.jsdelivr.net/npm/notyf@3.10.0/+esm";
const notifier = new Notyf({
    duration: 10000,
    dismissible: true,
});

async function login() {
    const userLogin = {
        user_login: document.getElementById("user-login").value,
        user_password: document.getElementById("user-password").value,
    };
    /* validate if user didn't provide any field */
    let invalidCount = 0;
    Object.keys(userLogin).forEach((e) => {
        if (!userLogin[e]) {
            document.getElementById(e.replace("_", "-")).parentElement.setAttribute("feedback", "invalid");
            invalidCount++;
        }
    });
    if (invalidCount) {
        notifier.error("Preencha os campos para realizar login.");
        return false;
    }
    /* end validation */
    /* verify if is an e-mail or nickname */
    const emailRegex = new RegExp(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (emailRegex.test(userLogin.user_login)) userLogin.user_email = userLogin.user_login;
    else userLogin.user_nickname = userLogin.user_login;
    delete userLogin.user_login;
    /* end validation */
    const serverResponse = await pacman.post("auth/login", userLogin);
    console.log(serverResponse);
    if (serverResponse.httpCode == 200) notifier.success(serverResponse.message);
    else notifier.error(serverResponse.message);
}

document.querySelector("[ref=login]").addEventListener("click", login);
document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("focus", (ev) => {
        const parentElement = ev.target.parentElement;
        if (parentElement.getAttribute("feedback")) parentElement.removeAttribute("feedback");
    });
});
