window.onload = passwordCheck;

function passwordCheck() {
    var isCorrectPassword = false;
    var attempts = 3;

    function sha256(input) {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        return crypto.subtle.digest("SHA-256", data).then(buffer => {
            return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
        });
    }

    function checkPasswordHash(passwordHash) {
        return passwordHash === "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090";
    }

    function promptForPassword() {
        var password = prompt("Please enter the password.");

        if (password !== null) {
            sha256(password).then(hashedPassword => {
                if (checkPasswordHash(hashedPassword)) {
                    isCorrectPassword = true;
                    alert("Password is correct!");
                } else {
                    attempts--;
                    if (attempts > 0) {
                        alert("Incorrect password. Try again. Attempts left: " + attempts + " ❌");
                        promptForPassword();
                    } else {
                        alert("Too many incorrect attempts. Please try again later. 🔒");
                        window.location.reload();
                    }
                }
            });
        } else {
            attempts += 2;
            alert("Penalty applied. Attempts left: " + attempts + " ❌");
            promptForPassword();
        }
    }

    promptForPassword();
}