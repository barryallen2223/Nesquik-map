window.addEventListener('load', function () {
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userDataArray = JSON.parse(localStorage.getItem('userDataArray'));
    userDataArray.push(userName + '|' + userData['totalPoints']);
    userDataArray.sort(function (a, b) {
        var numA = parseInt(a.split('|')[1]);
        var numB = parseInt(b.split('|')[1]);
        return numB - numA;
    });
    // Get the leaderboard-users container
    var leaderboardContainer = document.querySelector('.leaderboard-users');

    // Remove existing user elements
    while (leaderboardContainer.firstChild) {
        leaderboardContainer.removeChild(leaderboardContainer.firstChild);
    }

    // Loop through the top 3 users in userDataArray and update the HTML
    for (var i = 0; i < Math.min(userDataArray.length, 3); i++) {
        var userDataAux = userDataArray[i].split('|');
        var userPosition = i + 1;
        var userNameAux = userDataAux[0];
        var userPoints = userDataAux[1];

        // Create a new user element
        var userElement = document.createElement('div');
        userElement.classList.add('user');

        // Create the user position element
        var positionElement = document.createElement('span');
        positionElement.classList.add('user-position-' + userPosition);
        positionElement.innerHTML = '<i class="fa-solid fa-medal"></i>';

        // Create the user name element
        var nameElement = document.createElement('span');
        nameElement.classList.add('user-name');
        nameElement.textContent = userNameAux;

        // Create the user points element
        var pointsElement = document.createElement('span');
        pointsElement.classList.add('user-points');
        pointsElement.textContent = userPoints + ' points';

        // Append the elements to the user element
        userElement.appendChild(positionElement);
        userElement.appendChild(nameElement);
        userElement.appendChild(pointsElement);

        // Append the user element to the leaderboard container
        leaderboardContainer.appendChild(userElement);
    }
    console.log(userDataArray);
    if (userType == 'admin') {
        document.getElementById('userPicType').src = 'assets/images/adminUser.png';
        const h3Element = document.querySelector('.user-info h3');
        h3Element.textContent = userName + ' (admin) - ' + userData['totalPoints'] + ' pts';

        const reloaded = localStorage.getItem('reloaded');
        if (!reloaded) {
            localStorage.setItem('reloaded', 'true');
            location.reload();
        }
    } else {
        const h3Element = document.querySelector('.user-info h3');
        h3Element.textContent = userName + ' - ' + userData['totalPoints'] + ' pts';

        const reloaded = localStorage.getItem('reloaded');
        if (!reloaded) {
            localStorage.setItem('reloaded', 'true');
            location.reload();
        }
    }
});
