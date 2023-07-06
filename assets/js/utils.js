export function passwordStrengthChecker(password) {
    /* Define the regular expressions for various password criteria */
    const regex = {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        numeric: /[0-9]/,
        specialChars: /[!@#$%&*()?\/:;|~^{}[/´`"']/,
        length: /.{8,}/,
    };
    let strength = 0;
    /* Check each criteria and increase the strength score accordingly */
    if (regex.lowercase.test(password)) strength++;
    if (regex.uppercase.test(password)) strength++;
    if (regex.numeric.test(password)) strength++;
    if (regex.specialChars.test(password)) strength++;
    if (regex.length.test(password)) strength++;
    /* Return the strength score */
    return strength;
}
