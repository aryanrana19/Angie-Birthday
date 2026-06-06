const text =
`Hey Angie...

It's officially your birthday.

Which means you're 19 now.

That's honestly terrifying.

For me.

Because somehow the girl who blocks people for fun is becoming an adult.`;

let i = 0;

function typeWriter() {

    if(i < text.length){

        document.getElementById("typing").innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 40);
    }
}

typeWriter();

function scrollToSection(id){

    document
        .getElementById(id)
        .scrollIntoView({
            behavior:"smooth"
        });
}

document
.getElementById("cameraBtn")
.addEventListener("click", () => {

    alert("Nope. Camera still off. 😂");

    confetti({
        particleCount:150,
        spread:120
    });
});