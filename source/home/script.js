document.addEventListener("DOMContentLoaded", function () {

    const sendBtn = document.getElementById("sendBtn");
    const messageField = document.getElementById("message");

    sendBtn.addEventListener("click", sendEmail);

    function sendEmail() {
        const message = messageField.value.trim();

        if (message.length === 0) {
            alert("Írj üzenetet a küldés előtt!");
            return;
        }

        const email = "wizalevi01@gmail.com";
        const subject = "Beat vásárlási érdeklődés";
        const body = encodeURIComponent(message);

        window.location.href =
            "mailto:" + email +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + body;
    }

});
