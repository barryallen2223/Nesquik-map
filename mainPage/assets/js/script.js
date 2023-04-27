window.addEventListener('load', function () {
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    if (userType == 'admin') {
        document.getElementById('userPicType').src = 'assets/images/adminUser.png';
        const h3Element = document.querySelector('.user-info h3');
        h3Element.textContent = userName + ' (admin)';
    } else {
        const h3Element = document.querySelector('.user-info h3');
        h3Element.textContent = userName;
    }
    const reloaded = localStorage.getItem('reloaded');
    if (!reloaded) {
        localStorage.setItem('reloaded', 'true');
        location.reload();
    }
});
