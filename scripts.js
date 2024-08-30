// URLs para cada círculo
const urls = {
    circle1: 'https://shop.exotic.com.ar/productos/zip-up-hoodie-beige/',
    circle2: 'https://shop.exotic.com.ar/productos/exotic-club-card/',
    circle3: 'https://shop.exotic.com.ar/productos/zip-up-hoodie-grey/'
};



function adjustHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustHeight);
window.addEventListener('orientationchange', adjustHeight);
adjustHeight();




// Agrega evento de clic a cada círculo
document.querySelectorAll('circle').forEach(circle => {
    // Animación de hover y tooltip
    circle.addEventListener('mouseover', (e) => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = e.target.id === 'circle1' ? 'Zip Up Hoodie Beige' :
                              e.target.id === 'circle2' ? 'Exotic Club Card' :
                              'Zip Up Hoodie Grey';
        document.body.appendChild(tooltip);

        const rect = circle.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX - -20}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
        tooltip.style.opacity = '1';

 

        // Al salir del hover, eliminar el tooltip y restaurar el círculo
        circle.addEventListener('mouseout', () => {
            tooltip.style.opacity = '0';
            tooltip.remove();
            e.target.style.transform = 'scale(1)';
        });
    });

    // Evento de clic para abrir el URL correspondiente
    circle.addEventListener('click', (e) => {
        const circleId = e.target.id;
        window.open(urls[circleId], '_blank');
    });
});

// Animación de la opacidad del texto al entrar el mouse en la página
const instructionText = document.querySelector('.instruction-text');
document.body.addEventListener('mouseenter', () => {
    instructionText.style.opacity = '0';
    instructionText.style.transition = 'opacity 0.5s ease-in-out';
});
document.body.addEventListener('mouseleave', () => {
    instructionText.style.opacity = '1';
});


// Movimiento del fondo con el mouse
const imageContainer = document.querySelector('.image-container');
const backgroundImage = imageContainer.querySelector('.background-image');

// Aplicar una transición suave al mover la imagen
backgroundImage.style.transition = 'transform 0.1s ease-out';

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 20; // Ajusta la intensidad del movimiento (20px en este caso)
    const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    backgroundImage.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    
document.addEventListener('mouseleave', () => {
    backgroundImage.style.transform = 'scale(1) translate(0, 0)';
    backgroundImage.style.transition = 'transform 0.3s ease-out';
});






});

