import * as pacman from "../../assets/js/pacman.js";
import { Notyf } from "https://cdn.jsdelivr.net/npm/notyf@3.10.0/+esm";
import { passwordStrengthChecker } from "../../assets/js/utils.js";
const notifier = new Notyf({
    duration: 10000,
    dismissible: true,
});

async function createUser() {
    const newUser = {
        user_name: document.getElementById("user-name").value,
        user_email: document.getElementById("user-email").value,
        user_password: document.getElementById("user-password").value,
        user_nickname: document.getElementById("user-nickname").value,
    };
    /* validate if user didn't provide any field */
    let invalidCount = 0;
    Object.keys(newUser).forEach((e) => {
        if (!newUser[e]) {
            document.getElementById(e.replace("_", "-")).parentElement.setAttribute("feedback", "invalid");
            invalidCount++;
        }
    });
    if (invalidCount) {
        notifier.error("Os campos com '*' representam campos obrigatórios.");
        return false;
    }
    /* end validation */
    /* validate if provided password has strength */
    if (passwordStrengthChecker(newUser.user_password) <= 3) {
        notifier.error("A senha inserida é muito fraca.");
        return false;
    }
    /* end validation */
    /* validate if user name includes number */
    if (/[0-9]/.test(newUser.user_name)) {
        notifier.error("O nome não deve conter caracteres numéricos.");
        return false;
    }
    /* end validation */
    /* validate email */
    const emailRegex = new RegExp(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!emailRegex.test(newUser.user_email)) {
        notifier.error("O e-mail fornecido não é valido.");
        return false;
    }
    /* end validation */
    const serverResponse = await pacman.post("api/v1/users/new", newUser);
    if (serverResponse.httpCode == 201) notifier.success(serverResponse.message);
    else notifier.error(serverResponse.message);
}

document.querySelector("[ref=createAccount]").addEventListener("click", createUser);
document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("focus", (ev) => {
        const parentElement = ev.target.parentElement;
        if (parentElement.getAttribute("feedback")) parentElement.removeAttribute("feedback");
    });
});
