window.addEventListener('load', function () {
    const userName = localStorage.getItem('userName');
    const h3Element = document.querySelector('.user-info h3');
    h3Element.textContent = userName;
});