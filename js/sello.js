const sello = document.querySelector('.sello-link');
const audio = document.getElementById('audio-pato');

if (sello && audio) {
    sello.addEventListener('mouseenter', () => {
        audio.currentTime = 0;
        audio.volume = 0.5; 
        audio.play().catch(error => console.log("Audio bloqueado por el navegador"));
    });
}