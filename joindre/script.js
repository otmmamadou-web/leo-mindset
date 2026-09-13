
document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================================
    PARAMÈTRES
    =========================================
    */

        document.addEventListener("click", () => {
    window.location.href = "https://whatsapp.com/channel/0029VbBoFe23mFY1YAmUGo0p";
});


    // Vitesse de descente en pixels par seconde
    const scrollSpeed = 100;

    // Pause une fois arrivé en bas
    const pauseAtBottom = 1200;

    // Temps avant reprise après interaction utilisateur
    const resumeDelay = 2500;


    /*
    =========================================
    BOUTON PRINCIPAL
    =========================================
    */

    const mainButton = document.querySelector(".main-button");

    if (mainButton) {

        mainButton.addEventListener("click", (event) => {

            /*
            Le lien présent dans le HTML est utilisé
            naturellement.
            */

            // Ne pas bloquer le lien WhatsApp
        });

    }


    /*
    =========================================
    ANIMATIONS DES TICKETS
    =========================================
    */

    const tracks = document.querySelectorAll(".tickets-track");

    tracks.forEach((track) => {

        track.addEventListener("mouseenter", () => {

            track.style.animationPlayState = "paused";

        });

        track.addEventListener("mouseleave", () => {

            track.style.animationPlayState = "running";

        });

    });


    /*
    =========================================
    VARIABLES DU SCROLL
    =========================================
    */

    let isPaused = false;

    let pauseTimer = null;

    let bottomTimer = null;

    let lastTime = null;

    let currentPosition = 0;


    /*
    =========================================
    PAUSE APRÈS INTERACTION
    =========================================
    */

    function pauseAutoScroll() {

        isPaused = true;

        clearTimeout(pauseTimer);

        pauseTimer = setTimeout(() => {

            /*
            Récupère la vraie position après
            l'action de l'utilisateur
            */

            currentPosition = window.scrollY;

            lastTime = performance.now();

            isPaused = false;

        }, resumeDelay);

    }


    /*
    =========================================
    CALCUL DU BAS
    =========================================
    */

    function getMaxScroll() {

        return Math.max(
            0,
            document.documentElement.scrollHeight -
            window.innerHeight
        );

    }


    /*
    =========================================
    RETOUR EN HAUT
    =========================================
    */

    function goToTop() {

        /*
        On bloque le système pendant
        le retour en haut
        */

        isPaused = true;

        currentPosition = 0;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });


        /*
        Vérification supplémentaire
        */

        requestAnimationFrame(() => {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });

            currentPosition = 0;

            lastTime = performance.now();

            isPaused = false;

        });

    }


    /*
    =========================================
    ARRIVÉE EN BAS
    =========================================
    */

    function reachBottom(maxScroll) {

        /*
        Position absolument exacte
        */

        currentPosition = maxScroll;

        window.scrollTo({
            top: maxScroll,
            left: 0,
            behavior: "auto"
        });


        /*
        Stop pendant la pause
        */

        isPaused = true;


        clearTimeout(bottomTimer);


        bottomTimer = setTimeout(() => {

            /*
            Retour instantané en haut
            */

            goToTop();

        }, pauseAtBottom);

    }


    /*
    =========================================
    AUTO-SCROLL
    =========================================
    */

    function autoScroll(timestamp) {

        /*
        Première frame
        */

        if (lastTime === null) {

            lastTime = timestamp;

        }


        /*
        Temps écoulé depuis la frame précédente
        */

        const deltaTime =
            Math.min(timestamp - lastTime, 50);

        lastTime = timestamp;


        /*
        =========================================
        PAUSE
        =========================================
        */

        if (!isPaused) {

            const maxScroll = getMaxScroll();


            /*
            Page trop courte
            */

            if (maxScroll > 0) {


                /*
                -----------------------------------------
                AVANCEMENT BASÉ SUR LE TEMPS
                -----------------------------------------
                */

                currentPosition +=
                    (scrollSpeed * deltaTime) / 1000;


                /*
                -----------------------------------------
                ARRIVÉE EN BAS
                -----------------------------------------
                */

                if (currentPosition >= maxScroll) {

                    reachBottom(maxScroll);

                }

                else {

                    window.scrollTo({
                        top: currentPosition,
                        left: 0,
                        behavior: "auto"
                    });

                }

            }

        }


        /*
        Continuer la boucle
        */

        requestAnimationFrame(autoScroll);

    }


    /*
    =========================================
    SOURIS
    =========================================
    */

    window.addEventListener(
        "wheel",
        () => {

            pauseAutoScroll();

        },
        {
            passive: true
        }
    );


    /*
    =========================================
    TACTILE
    =========================================
    */

    window.addEventListener(
        "touchstart",
        () => {

            pauseAutoScroll();

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        () => {

            pauseAutoScroll();

        },
        {
            passive: true
        }
    );


    /*
    =========================================
    CLAVIER
    =========================================
    */

    window.addEventListener("keydown", (event) => {

        const keys = [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " "
        ];


        if (keys.includes(event.key)) {

            pauseAutoScroll();

        }

    });


    /*
    =========================================
    DÉMARRAGE
    =========================================
    */

    setTimeout(() => {

        /*
        Commencer exactement en haut
        */

        currentPosition = 0;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });


        /*
        Démarrage
        */

        requestAnimationFrame(autoScroll);

    }, 4000);

});
