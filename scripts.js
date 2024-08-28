@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Helvetica:wght@400;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 200;
}

.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #000;
  padding: calc(10px + env(safe-area-inset-top)) 20px 10px 20px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar .logo {
  margin-right: 20px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
  align-items: center;
}

.navbar ul li {
  display: inline;
  cursor: pointer;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  font-weight: 200;
}

.navbar .icons {
  display: flex;
  gap: 15px;
  margin-left: auto;
}

.navbar .icons img {
  width: 22px;
  height: auto;
  cursor: pointer;
}

.image-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1920px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

circle {
  fill: rgba(255, 255, 255, 0.7);
  pointer-events: auto;
  cursor: pointer;
  animation: fade 2s infinite;
}

@keyframes fade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes expand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.tooltip {
  position: fixed;
  background-color: white;
  color: black;
  font-weight: bold;
  font-family: 'Helvetica', sans-serif;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
  z-index: 100;
  transform: translate(-50%, -100%);
}

.tooltip:after {
  content: none;
}

.instruction-text {
  position: fixed;
  bottom: 10px;
  left: 8px;
  color: white;
  font-family: 'Helvetica', sans-serif;
  font-weight: bold;
  line-height: .90;
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;
}

.instruction-text.fade-out {
  opacity: 0;
}

.instruction-text .bold-text {
  font-weight: bold;
}

.instruction-text .italic-text {
  font-family: 'Helvetica', sans-serif;
  font-style: italic;
  font-weight: normal;
}

/* Estilos para Desktop */
@media (min-width: 1025px) {
  .navbar .logo {
    width: 90px;
  }

  .navbar ul {
    font-size: 12px;
  }

  .navbar .icons img {
    width: 22px;
  }

  .instruction-text {
    font-size: 72px;
  }
}

/* Estilos para Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .navbar .logo {
    width: 80px;
    margin-left: -15px;
    margin-right: 15px;
  }

  .navbar ul {
    font-size: 14px;
  }

  .navbar .icons img {
    width: 20px;
  }

  .instruction-text {
    font-size: 40px;
  }
}

/* Estilos para Móviles */
@media (max-width: 767px) {
  .navbar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }

  .navbar .logo {
    width: 90px;
    margin-bottom: 0;
  }

  .navbar ul {
    display: none;
  }

  .navbar .icons {
    display: flex;
    gap: 15px;
  }

  .navbar .icons img {
    width: 24px;
    height: 24px;
  }

  .instruction-text {
    font-size: 20px;
    line-height: 1.2;
    white-space: nowrap;
    display: inline-block;
  }

  .instruction-text:before {
    content: "Scroll y ";
  }

  .instruction-text:after {
    content: " ➔";
    padding-left: 5px;
}

.overlay circle {
  /* Coordenadas ajustadas en porcentaje para adaptarse al tamaño de la imagen en dispositivos móviles */
  cx: calc(100% * (1000 / 1920)); /* Posición relativa del círculo 1 */
  cy: calc(100% * (868 / 1080));  /* Posición relativa del círculo 1 */
  r: 20px;
}

#circle2 {
  cx: calc(100% * (1180 / 1920)); /* Posición relativa del círculo 2 */
  cy: calc(100% * (493 / 1080));  /* Posición relativa del círculo 2 */
}

#circle3 {
  cx: calc(100% * (725 / 1920)); /* Posición relativa del círculo 3 */
  cy: calc(100% * (774 / 1080));  /* Posición relativa del círculo 3 */
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
}
}

.circle-animation {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  pointer-events: none;
  animation: expand 2s infinite;
  transform-origin: center;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translate(-50%, -100%);
}
