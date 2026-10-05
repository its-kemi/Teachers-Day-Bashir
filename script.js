/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loaderNumber");
const loaderProgress = document.getElementById("loaderProgress");

let loadValue = 0;

const loaderInterval = setInterval(() => {

    loadValue += Math.floor(
        Math.random() * 4
    ) + 1;

    if (loadValue >= 100) {

        loadValue = 100;

        clearInterval(loaderInterval);

        setTimeout(() => {

            loader.classList.add("hide");

        }, 500);
    }

    loaderNumber.textContent = loadValue;

    loaderProgress.style.width =
        `${loadValue}%`;

}, 35);


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero = document.querySelector(".hero");

window.addEventListener("mousemove", (event) => {

    if (!hero) return;

    const x =
        (event.clientX /
            window.innerWidth -
            .5) * 2;

    const y =
        (event.clientY /
            window.innerHeight -
            .5) * 2;

    const orbits =
        document.querySelectorAll(
            ".hero-orbit"
        );

    orbits.forEach((orbit, index) => {

        const strength =
            (index + 1) * 8;

        orbit.style.transform =
            `translate(
                ${x * strength}px,
                ${y * strength}px
            )`;

    });

});


/* =========================================================
   EXPLOSION SCROLL
========================================================= */

const explosion =
    document.querySelector(".explosion");

const explosionWords =
    document.querySelectorAll(
        ".explosion-word"
    );

window.addEventListener("scroll", () => {

    if (!explosion) return;

    const rect =
        explosion.getBoundingClientRect();

    const progress =
        Math.min(
            Math.max(
                -rect.top /
                (explosion.offsetHeight -
                window.innerHeight),
                0
            ),
            1
        );

    explosionWords.forEach(
        (word, index) => {

            const angle =
                index * 40;

            const distance =
                progress * 250;

            const x =
                Math.cos(
                    angle * Math.PI / 180
                ) * distance;

            const y =
                Math.sin(
                    angle * Math.PI / 180
                ) * distance;

            word.style.transform =
                `translate(
                    ${x}px,
                    ${y}px
                )
                rotate(
                    ${progress * (index % 2 ? 15 : -15)}deg
                )`;

            word.style.opacity =
                1 - progress * .8;

        }
    );

});


/* =========================================================
   TEACHER PARTICLES
========================================================= */

const teacherCanvas =
    document.getElementById(
        "teacherCanvas"
    );

const teacherContext =
    teacherCanvas.getContext("2d");

let teacherParticles = [];

function resizeTeacherCanvas() {

    teacherCanvas.width =
        window.innerWidth *
        devicePixelRatio;

    teacherCanvas.height =
        window.innerHeight *
        devicePixelRatio;

    teacherContext.scale(
        devicePixelRatio,
        devicePixelRatio
    );

    createTeacherParticles();
}

function createTeacherParticles() {

    teacherParticles = [];

    const count =
        window.innerWidth < 700
            ? 45
            : 100;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        teacherParticles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.5,

            speed:
                Math.random() * .3 + .1,

            opacity:
                Math.random() * .5

        });
    }
}

function animateTeacherParticles() {

    teacherContext.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    teacherParticles.forEach(
        particle => {

            particle.y -=
                particle.speed;

            if (particle.y < 0) {

                particle.y =
                    window.innerHeight;
            }

            teacherContext.beginPath();

            teacherContext.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            teacherContext.fillStyle =
                `rgba(
                    201,
                    181,
                    138,
                    ${particle.opacity}
                )`;

            teacherContext.fill();

        }
    );

    requestAnimationFrame(
        animateTeacherParticles
    );
}

resizeTeacherCanvas();

window.addEventListener(
    "resize",
    resizeTeacherCanvas
);

animateTeacherParticles();


/* =========================================================
   LESSON CARD TILT
========================================================= */

const lessonCards =
    document.querySelectorAll(
        ".lesson-card"
    );

lessonCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                (x / rect.width - .5) *
                8;

            const rotateX =
                -(y / rect.height - .5) *
                8;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-12px)`;

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   CONSTELLATION
========================================================= */

const constellationCanvas =
    document.getElementById(
        "constellationCanvas"
    );

const constellationContext =
    constellationCanvas.getContext(
        "2d"
    );

let stars = [];

function resizeConstellation() {

    constellationCanvas.width =
        window.innerWidth *
        devicePixelRatio;

    constellationCanvas.height =
        window.innerHeight *
        devicePixelRatio;

    constellationContext.scale(
        devicePixelRatio,
        devicePixelRatio
    );

    stars = [];

    const amount =
        window.innerWidth < 700
            ? 45
            : 90;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            vx:
                (Math.random() - .5)
                * .25,

            vy:
                (Math.random() - .5)
                * .25

        });

    }
}

function animateConstellation() {

    constellationContext.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    stars.forEach(star => {

        star.x += star.vx;
        star.y += star.vy;

        if (
            star.x < 0 ||
            star.x > window.innerWidth
        ) {
            star.vx *= -1;
        }

        if (
            star.y < 0 ||
            star.y > window.innerHeight
        ) {
            star.vy *= -1;
        }

        constellationContext.beginPath();

        constellationContext.arc(
            star.x,
            star.y,
            1,
            0,
            Math.PI * 2
        );

        constellationContext.fillStyle =
            "rgba(201,181,138,.7)";

        constellationContext.fill();

    });


    for (
        let i = 0;
        i < stars.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < stars.length;
            j++
        ) {

            const dx =
                stars[i].x -
                stars[j].x;

            const dy =
                stars[i].y -
                stars[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 130) {

                constellationContext.beginPath();

                constellationContext.moveTo(
                    stars[i].x,
                    stars[i].y
                );

                constellationContext.lineTo(
                    stars[j].x,
                    stars[j].y
                );

                constellationContext.strokeStyle =
                    `rgba(
                        201,
                        181,
                        138,
                        ${(
                            1 -
                            distance / 130
                        ) * .2}
                    )`;

                constellationContext.stroke();

            }

        }

    }

    requestAnimationFrame(
        animateConstellation
    );
}

resizeConstellation();

window.addEventListener(
    "resize",
    resizeConstellation
);

animateConstellation();


/* =========================================================
   MESSAGE — THE MESSAGE THAT WAS NEVER WRITTEN
========================================================= */

const messageScene =
    document.getElementById(
        "messageScene"
    );

const terminalPhase =
    document.getElementById(
        "terminalPhase"
    );

const impossiblePhase =
    document.getElementById(
        "impossiblePhase"
    );

const paperPhase =
    document.getElementById(
        "paperPhase"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );

const messageProgress =
    document.querySelector(
        ".message-progress"
    );

const typingCommand =
    document.getElementById(
        "typingCommand"
    );

const systemLines =
    document.getElementById(
        "systemLines"
    );

const impossibleTitle =
    impossiblePhase.querySelector(
        "h2"
    );

const impossibleLine =
    impossiblePhase.querySelector(
        ".impossible-line"
    );

const paperLight =
    document.querySelector(
        ".paper-light"
    );

const letterPaper =
    document.querySelector(
        ".letter-paper"
    );

const letterLines =
    document.querySelectorAll(
        ".letter-line"
    );

const signature =
    document.querySelector(
        ".signature path"
    );

const finalInner =
    finalMessage.querySelector(
        ".final-message-inner"
    );


/* =========================================================
   TYPING
========================================================= */

const commandText =
    "preparing a message...";

let typingIndex = 0;

function typeCommand() {

    if (
        typingIndex <
        commandText.length
    ) {

        typingCommand.textContent +=
            commandText[typingIndex];

        typingIndex++;

        setTimeout(
            typeCommand,
            65
        );
    }
}

setTimeout(
    typeCommand,
    1000
);


/* =========================================================
   MESSAGE SCROLL PROGRESS
========================================================= */

function updateMessageScene() {

    if (!messageScene) return;

    const rect =
        messageScene.getBoundingClientRect();

    const total =
        messageScene.offsetHeight -
        window.innerHeight;

    const progress =
        Math.min(
            Math.max(
                -rect.top / total,
                0
            ),
            1
        );

    messageProgress.style.width =
        `${progress * 100}%`;


    /* ================================================
       PHASE 01
    ================================================ */

    const terminalProgress =
        Math.min(
            progress / .22,
            1
        );

    systemLines.style.opacity =
        terminalProgress;

    const lines =
        systemLines.querySelectorAll(
            "p"
        );

    lines.forEach(
        (line, index) => {

            const start =
                .15 +
                index * .15;

            const local =
                Math.min(
                    Math.max(
                        (
                            terminalProgress -
                            start
                        ) / .2,
                        0
                    ),
                    1
                );

            line.style.opacity =
                local;

            line.style.transform =
                `translateX(
                    ${(1 - local) * -20}px
                )`;

        }
    );


    /* ================================================
       PHASE 02
    ================================================ */

    const impossibleProgress =
        Math.min(
            Math.max(
                (progress - .18) / .22,
                0
            ),
            1
        );

    impossiblePhase.style.opacity =
        impossibleProgress;

    impossibleTitle.style.opacity =
        impossibleProgress;

    impossibleTitle.style.transform =
        `scale(
            ${.85 + impossibleProgress * .15}
        )`;

    impossibleLine.style.transform =
        `scaleX(
            ${impossibleProgress}
        )`;


    /* ================================================
       PHASE 03 — PAPER
    ================================================ */

    const paperProgress =
        Math.min(
            Math.max(
                (progress - .35) / .38,
                0
            ),
            1
        );

    paperPhase.style.opacity =
        paperProgress;

    paperLight.style.opacity =
        paperProgress * .8;

    paperLight.style.transform =
        `scale(
            ${.5 + paperProgress * .6}
        )`;

    letterPaper.style.opacity =
        paperProgress;

    letterPaper.style.transform =
        `translateY(
            ${(1 - paperProgress) * 120}px
        )
        rotateX(
            ${(1 - paperProgress) * 12}deg
        )
        rotateZ(
            ${-1 + paperProgress}deg
        )
        scale(
            ${.75 + paperProgress * .25}
        )`;


    /* ================================================
       MEMORY FRAGMENTS
    ================================================ */

    const memories =
        document.querySelectorAll(
            ".memory"
        );

    memories.forEach(
        (memory, index) => {

            const direction =
                index % 2 === 0
                    ? -1
                    : 1;

            const distance =
                (1 - paperProgress) *
                80;

            memory.style.transform =
                `translateX(
                    ${direction * distance}px
                )`;

            memory.style.opacity =
                paperProgress *
                .7;

        }
    );


    /* ================================================
       LETTER WRITING
    ================================================ */

    const writingStart = .45;

    const writingRange = .27;

    letterLines.forEach(
        (line, index) => {

            const lineStart =
                writingStart +
                index *
                (writingRange /
                letterLines.length);

            const local =
                Math.min(
                    Math.max(
                        (
                            progress -
                            lineStart
                        ) /
                        .055,
                        0
                    ),
                    1
                );

            line.style.opacity =
                local;

            line.style.clipPath =
                `inset(
                    0
                    ${(1 - local) * 100}%
                    0
                    0
                )`;

            line.style.transform =
                `translateY(
                    ${(1 - local) * 12}px
                )`;

        }
    );


    /* ================================================
       SIGNATURE
    ================================================ */

    const signatureProgress =
        Math.min(
            Math.max(
                (progress - .69) / .1,
                0
            ),
            1
        );

    if (signature) {

        signature.style.strokeDashoffset =
            1200 -
            signatureProgress * 1200;

    }


    /* ================================================
       PHASE 04 — FINAL
    ================================================ */

    const finalProgress =
        Math.min(
            Math.max(
                (progress - .75) / .25,
                0
            ),
            1
        );

    finalMessage.style.opacity =
        finalProgress;

    finalInner.style.opacity =
        finalProgress;

    finalInner.style.transform =
        `translateY(
            ${(1 - finalProgress) * 50}px
        )`;

}


/* =========================================================
   SCROLL LISTENER
========================================================= */

window.addEventListener(
    "scroll",
    updateMessageScene,
    {
        passive: true
    }
);

updateMessageScene();


/* =========================================================
   GENERAL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".question-content, .code-window, .teacher-content, .lessons-heading, .terminal, .constellation-content"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(60px)";

    element.style.transition =
        "opacity 1.2s var(--ease), transform 1.2s var(--ease)";

    revealObserver.observe(
        element
    );

});


/* =========================================================
   FINAL SMALL EFFECT
========================================================= */

const finalSection =
    document.querySelector(".final");

window.addEventListener(
    "scroll",
    () => {

        if (!finalSection) return;

        const rect =
            finalSection.getBoundingClientRect();

        const progress =
            Math.min(
                Math.max(
                    -rect.top /
                    finalSection.offsetHeight,
                    0
                ),
                1
            );

        const finalMessageBox =
            finalSection.querySelector(
                ".final-message"
            );

        if (finalMessageBox) {

            finalMessageBox.style.transform =
                `translateY(
                    ${progress * -40}px
                )`;

        }

    },
    {
        passive: true
    }
);