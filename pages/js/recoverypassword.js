import * as pacman from "../../assets/js/pacman.js";
import { Notyf } from "https://cdn.jsdelivr.net/npm/notyf@3.10.0/+esm";
import { passwordStrengthChecker } from "../../assets/js/utils.js";
const notifier = new Notyf({
    duration: 5000,
    dismissible: true,
});

async function recoveryPassowrd() {
    const userRecovery = {
        user_email: document.getElementById("user-email").value,
    };
    /* validate if user didn't provide any field */
    let invalidCount = 0;
    Object.keys(userRecovery).forEach((e) => {
        if (!userRecovery[e]) {
            document.getElementById(e.replace("_", "-")).parentElement.setAttribute("feedback", "invalid");
            invalidCount++;
        }
    });
    if (invalidCount) {
        notifier.error("Informe o usuário ou e-mail para realizar a recuperação de senha.");
        return false;
    }

    /* validate email */
    const emailRegex = new RegExp(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!emailRegex.test(userRecovery.user_email)) {
        notifier.error("O e-mail fornecido não é valido.");
        return false;
    }
    /* end validation */
    const serverResponse = await pacman.post("auth/token/generate", userRecovery);
    if (serverResponse.httpCode == 200) {
        document.querySelector("[ref=sendCode]").remove();
        document.querySelectorAll(".newPassword").forEach((e) => e.classList.remove("newPassword"));
        notifier.success(serverResponse.message);
        document.querySelector("[ref=confirmNewPassword]").addEventListener("click", resetPassword);
    } else {
        notifier.error(serverResponse.message);
    }
}

async function resetPassword() {
    const userRecovery = {
        token: document.getElementById("recovery-code-sent").value,
        user_email: document.getElementById("user-email").value,
        user_password: document.getElementById("user-password1").value,
        user_password_verificaiton: document.getElementById("user-password2").value,
    };
    /* validate if user didn't provide any field */
    let invalidCount = 0;
    Object.keys(userRecovery).forEach((e) => {
        if (!userRecovery[e]) {
            document.getElementById(e.replace("_", "-")).parentElement.setAttribute("feedback", "invalid");
            invalidCount++;
        }
    });
    if (invalidCount) {
        return notifier.error("Os campos com '*' representam campos obrigatórios.");
    }
    if (userRecovery.user_password !== userRecovery.user_password_verificaiton) {
        return notifier.error("As senhas não correspondem.");
    }
    /* end validation */
    const serverResponse = await pacman.put("api/v1/users/recovery/" + userRecovery.token, userRecovery);
    if (serverResponse.httpCode == 200) {
        notifier.success(serverResponse.message);
        setTimeout((e) => (window.location.href = window.location.origin + "/pages/html/login.html"), 5000);
    } else notifier.error(serverResponse.message);
}

document.querySelector("[ref=sendCode]").addEventListener("click", recoveryPassowrd);
document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("focus", (ev) => {
        const parentElement = ev.target.parentElement;
        if (parentElement.getAttribute("feedback")) parentElement.removeAttribute("feedback");
    });
});
