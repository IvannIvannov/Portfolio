window.onload = function () {
    emailjs.init("FVqK0YPmylRafsFN1");

    const form = document.getElementById("contact-form");
    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        emailjs.sendForm("service_oyhmimp", "template_7ipsl3l", this)
            .then(() => {
                form.reset();

                btn.textContent = "Sent!";
                btn.disabled = true;
                btn.classList.add("btn-sent");

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.classList.remove("btn-sent");
                }, 3000);
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
            });
    });
};
