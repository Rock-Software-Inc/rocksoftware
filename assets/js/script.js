function recoveryCodeMask(element) {
    element.addEventListener("input", (ev) => {
        let value = ev.target.value;
        value = value.replace(/\W/g, "");
        value = value.substring(0, 7).toUpperCase();
        // Apply the mask
        if (value.length > 3) value = value.substring(0, 3) + "-" + value.substring(3);
        element.value = value;
    });
}
