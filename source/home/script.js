document.getElementById("sendBtn").addEventListener("click", function () {
    const message = document.getElementById("message").value.trim();

    if (message === "") {
        alert("Írj valamit mielőtt elküldöd!");
        return;
    }

    const email = "wizalevi01@gmail.com";
    const subject = "Beat vásárlási érdeklődés";
    const body = encodeURIComponent(message);

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
});
