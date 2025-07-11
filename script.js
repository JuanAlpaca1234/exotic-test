document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('viewport');
    const imageTransformWrapper = document.getElementById('imageTransformWrapper');
    const backgroundImage = document.getElementById('backgroundImage');

    const clickableObjectsData = [
        { id: 'atm', label: 'ATM', x: 575, y: 500, width: 94, height: 189, url: 'INside/IN-index.html' },
        { id: 'shop', label: 'Shop', x: 971, y: 514, width: 94, height: 51, url: 'https://shop.exotic.com.ar/' },
        { id: 'bate', label: 'Bate', x: 1051, y: 538, width: 24, height: 90, url: 'https://shop.exotic.com.ar/' },
        { id: 'bolsos', label: 'Bricks', x: 1082, y: 618, width: 55, height: 66, url: 'https://shop.exotic.com.ar/' },
        { id: 'ropa', label: 'Ropa', x: 790, y: 470, width: 70, height: 114, url: 'https://shop.exotic.com.ar/' }
    ];

    const originalImageWidth = 1920;
    const originalImageHeight = 1080;

    function createClickableAreas() {
        imageTransformWrapper.querySelectorAll('.clickable-area').forEach(area => area.remove());
        clickableObjectsData.forEach(objData => {
            const area = document.createElement('a');
            area.href = objData.url;
            area.target = '_blank';
            area.classList.add('clickable-area');
            area.id = objData.id;
            area.setAttribute('aria-label', objData.label || `Enlace a objeto ${objData.id}`);
            if (objData.label) {
                const fixedLabel = document.createElement('span');
                fixedLabel.classList.add('area-fixed-label');
                fixedLabel.textContent = objData.label;
                fixedLabel.dataset.originalText = objData.label;
                area.appendChild(fixedLabel);
            }
            imageTransformWrapper.appendChild(area);
            area.addEventListener('mouseenter', () => {
                const label = area.querySelector('.area-fixed-label');
                if (label) {
                    if (label.glitchIntervalId) { clearInterval(label.glitchIntervalId); label.glitchIntervalId = null; }
                    if (label.glitchTimeoutId) { clearTimeout(label.glitchTimeoutId); label.glitchTimeoutId = null; }
                    label.textContent = label.dataset.originalText;
                    area.dataset.isHovered = 'true';
                    label.isGlitching = false;
                }
            });
            area.addEventListener('mouseleave', () => {
                area.dataset.isHovered = 'false';
            });
        });
        updateAreaPositions();
    }

    function updateAreaPositions() {
        if (!backgroundImage.offsetWidth || !backgroundImage.offsetHeight) return;
        const currentImageWidth = backgroundImage.offsetWidth;
        const currentImageHeight = backgroundImage.offsetHeight;
        clickableObjectsData.forEach(objData => {
            const areaElement = document.getElementById(objData.id);
            if (!areaElement) return;
            const xPercent = (objData.x / originalImageWidth) * 100;
            const yPercent = (objData.y / originalImageHeight) * 100;
            const widthPercent = (objData.width / originalImageWidth) * 100;
            const heightPercent = (objData.height / originalImageHeight) * 100;
            areaElement.style.left = `${(xPercent / 100) * currentImageWidth}px`;
            areaElement.style.top = `${(yPercent / 100) * currentImageHeight}px`;
            areaElement.style.width = `${(widthPercent / 100) * currentImageWidth}px`;
            areaElement.style.height = `${(heightPercent / 100) * currentImageHeight}px`;
        });
    }

    const GLITCH_CHARS = 'ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՖՕ奈펩がਦ aude카 오는تهすがТУФХЦЧШЩЪЫЬЭЮЯゃょАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯțאבגדהוזחטיכךלמםנןסעפףצץקרשתΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩÇÐÑØŠŪŽისե градусовათิตย์กับみんなабвгдеёжзийклмнопрстуфхцчшщъЫЬЭЮЯゃűíöüóőúéáABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?#@&*$!<>[]{}()/\%';
    function generateRandomString(length) { let result = ''; for (let i = 0; i < length; i++) { result += GLITCH_CHARS.charAt(Math.floor(Math.random() * GLITCH_CHARS.length)); } return result; }
    function startLabelGlitch(labelElement, glitchTotalDuration = 800, charUpdateInterval = 65) {
        if (!labelElement || !labelElement.dataset.originalText) return;
        const parentArea = labelElement.closest('.clickable-area');
        if (parentArea?.dataset.isHovered === 'true' || labelElement.isGlitching) return;
        const originalText = labelElement.dataset.originalText;
        let cycles = 0;
        const maxCycles = Math.floor(glitchTotalDuration / charUpdateInterval);
        if (labelElement.glitchIntervalId) clearInterval(labelElement.glitchIntervalId);
        if (labelElement.glitchTimeoutId) clearTimeout(labelElement.glitchTimeoutId);
        labelElement.isGlitching = true;
        labelElement.glitchIntervalId = setInterval(() => {
            if (parentArea?.dataset.isHovered === 'true') { clearInterval(labelElement.glitchIntervalId); labelElement.glitchIntervalId = null; labelElement.textContent = originalText; labelElement.isGlitching = false; return; }
            labelElement.textContent = generateRandomString(originalText.length);
            cycles++;
            if (cycles >= maxCycles) { clearInterval(labelElement.glitchIntervalId); labelElement.glitchIntervalId = null; labelElement.textContent = originalText; labelElement.isGlitching = false; }
        }, charUpdateInterval);
        labelElement.glitchTimeoutId = setTimeout(() => {
            if (labelElement.glitchIntervalId) { clearInterval(labelElement.glitchIntervalId); labelElement.glitchIntervalId = null; }
            if (parentArea?.dataset.isHovered !== 'true') { labelElement.textContent = originalText; }
            labelElement.isGlitching = false;
            labelElement.glitchTimeoutId = null;
        }, glitchTotalDuration + 100);
    }

    setInterval(() => {
        const allLabels = document.querySelectorAll('.area-fixed-label');
        if (allLabels.length === 0) return;
        const availableLabels = Array.from(allLabels).filter(label => {
            const parentArea = label.closest('.clickable-area');
            return parentArea?.dataset.isHovered !== 'true' && !label.isGlitching;
        });
        if (availableLabels.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableLabels.length);
            startLabelGlitch(availableLabels[randomIndex], Math.random() * 600 + 400);
        }
    }, 1500);

    // --- LÓGICA PARA EL EFECTO DE ZOOM CON MOUSE ---
    function setupMouseZoomEffect() {
        const zoomLevel = 1.2;
        let isActive = false;

        if (window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth <= 768) {
            imageTransformWrapper.style.transform = 'scale(1) translate(0px, 0px)';
            imageTransformWrapper.style.pointerEvents = 'auto'; 
            return;
        }

        viewport.addEventListener('mouseenter', () => {
            isActive = true;
            imageTransformWrapper.style.transition = 'transform 0.1s linear';
            imageTransformWrapper.style.pointerEvents = 'none'; 
            imageTransformWrapper.style.transform = `scale(${zoomLevel})`; 
        });

        viewport.addEventListener('mousemove', (event) => {
            if (!isActive) return;

            const viewportRect = viewport.getBoundingClientRect();
            
            const zoomedWrapperWidth = viewportRect.width * zoomLevel;
            const zoomedWrapperHeight = viewportRect.height * zoomLevel;

            const maxTranslateX = zoomedWrapperWidth - viewportRect.width;
            const maxTranslateY = zoomedWrapperHeight - viewportRect.height;

            const mouseXNorm = event.clientX / viewportRect.width;
            const mouseYNorm = event.clientY / viewportRect.height;
            
            let translateX = -mouseXNorm * maxTranslateX;
            let translateY = -mouseYNorm * maxTranslateY;

            imageTransformWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
        });

        viewport.addEventListener('mouseleave', () => {
            isActive = false;
            imageTransformWrapper.style.transition = 'transform 0.4s ease-out';
            imageTransformWrapper.style.transformOrigin = 'center center';
            imageTransformWrapper.style.transform = 'scale(1) translate(0px, 0px)';
            imageTransformWrapper.style.pointerEvents = 'auto'; 
        });

        window.addEventListener('resize', () => {
            if (window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth <= 768) {
                isActive = false;
                imageTransformWrapper.style.transition = 'none';
                imageTransformWrapper.style.transformOrigin = 'center center';
                imageTransformWrapper.style.transform = 'scale(1) translate(0px, 0px)';
                imageTransformWrapper.style.pointerEvents = 'auto'; 
            } else {
                if (!viewport.matches(':hover')) {
                    imageTransformWrapper.style.transformOrigin = 'center center';
                    imageTransformWrapper.style.transform = 'scale(1) translate(0px, 0px)';
                    imageTransformWrapper.style.pointerEvents = 'auto';
                }
            }
        });
    }

    // --- INICIALIZACIÓN ---
    // Función para manejar la carga de la imagen y la inicialización
    const initializePage = () => {
        createClickableAreas();
        setupMouseZoomEffect();

        // CENTRAR LA IMAGEN EN MÓVIL AL CARGAR
        // Comprobamos si estamos en una pantalla pequeña (móvil)
        if (window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth <= 768) {
            // Calculamos el scroll necesario para centrar la imagen
            // La imagen puede ser más ancha que el viewport en móvil (overflow-x: scroll)
            const scrollWidth = viewport.scrollWidth; // Ancho total del contenido scrollable
            const clientWidth = viewport.clientWidth; // Ancho visible del viewport
            
            // Si el contenido es más ancho que el viewport, lo centramos
            if (scrollWidth > clientWidth) {
                viewport.scrollLeft = (scrollWidth - clientWidth) / 2;
            }
        }
    };


    if (backgroundImage.complete && backgroundImage.naturalWidth > 0) {
        initializePage();
    } else {
        backgroundImage.addEventListener('load', () => {
            initializePage();
        });
        backgroundImage.addEventListener('error', () => {
            console.error("Error al cargar la imagen de fondo.");
        });
    }
    window.addEventListener('resize', () => {
        updateAreaPositions();
        // RE-CENTRAR en resize si estamos en móvil y el ancho ha cambiado
        if (window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth <= 768) {
             const scrollWidth = viewport.scrollWidth;
             const clientWidth = viewport.clientWidth;
             if (scrollWidth > clientWidth) {
                 viewport.scrollLeft = (scrollWidth - clientWidth) / 2;
             }
        }
    });
 });


//Loading screen
 window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.style.display = "none";
    }
});
