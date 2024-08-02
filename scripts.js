const imageContainer = document.querySelector('.image-container');
const image = imageContainer.querySelector('img');
const hotspots = document.querySelectorAll('.hotspot');
const circles = [];
const tooltips = [];
const instructionText = document.querySelector('.instruction-text');

hotspots.forEach(hotspot => {
    const circle = document.createElement('div');
    circle.classList.add('circle-animation');
    circle.style.width = '100px';
    circle.style.height = '100px';
    circle.style.left = (hotspot.offsetLeft + (hotspot.clientWidth / 2) - 50) + 'px';
    circle.style.top = (hotspot.offsetTop + (hotspot.clientHeight / 2) - -20) + 'px';
    document.body.appendChild(circle);
    circles.push(circle);

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = hotspot.getAttribute('data-tooltip');
    tooltip.style.left = (hotspot.offsetLeft + (hotspot.clientWidth / 2) - 73) + 'px';
    tooltip.style.top = (hotspot.offsetTop - (tooltip.clientHeight / 2) - -40) + 'px'; 
    document.body.appendChild(tooltip);
    tooltips.push(tooltip);

    hotspot.addEventListener('mouseover', () => {
        tooltip.style.opacity = 1;
    });

    hotspot.addEventListener('mouseout', () => {
        tooltip.style.opacity = 0;
    });
});

imageContainer.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    image.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    instructionText.classList.add('fade-out');
    hotspots.forEach((hotspot, index) => {
        hotspot.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        circles[index].style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        tooltips[index].style.transform = `translate(${x}px, ${y}px)`;
    });
});

imageContainer.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
    instructionText.classList.remove('fade-out');
    hotspots.forEach((hotspot, index) => {
        hotspot.style.transform = 'scale(1)';
        circles[index].style.transform = 'scale(1)';
        tooltips[index].style.transform = 'none';
    });
});

imageContainer.addEventListener('scroll', () => {
    const x = imageContainer.scrollLeft;
    const y = imageContainer.scrollTop;

    hotspots.forEach((hotspot, index) => {
        const translateX = x * 0.1;
        const translateY = y * 0.1;
        hotspot.style.transform = `translate(${translateX}px, ${translateY}px)`;
        circles[index].style.transform = `translate(${translateX}px, ${translateY}px)`;
        tooltips[index].style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
});
