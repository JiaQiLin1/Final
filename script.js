//for login and sign in
//-----------------------------------------------------------------------------------------------------------\\
//database didnt work, so i gave up here and just used local storage
//Note: when registering a username that has already previously existed, it will rewrite it
//for ex: loging in: a, a || then we sign up || a, b, b || now a,a no longer works but only b,b
function registerUser() {
    let username = document.getElementById('UserSign').value;
    let password = document.getElementById('PassSign').value;
    let rePassword = document.getElementById('PassReSign').value;
    
    if (password === rePassword) {
        localStorage.setItem(username, password);
        document.getElementById('UserSign').value = '';
        document.getElementById('PassSign').value = '';
        document.getElementById('PassReSign').value = '';
        alert('Account created successfully. Now you can log in.');
        location.reload();
    } 
    else {
        alert('Passwords are not the same. Please re-enter your password');
        document.getElementById('PassSign').value = '';
        document.getElementById('PassReSign').value = '';
    }
}

function logUser() {
    let username = document.getElementById('UserLog').value;
    let password = document.getElementById('PassLog').value;
    var storedPassword = localStorage.getItem(username);

    if (storedPassword === password.toString()) {
        alert('Login successful!');
        window.location.href = 'choices.html';
    } 
    else {
        alert('Invalid username or password. Please try again.');
        document.getElementById('PassLog').value = '';
    }
}

function LogIn(){
    getUser();
    logUser();
}

//for later || feedback
//didnt figure it out
let user;
function getUser() {
    return document.getElementById('UserLog').value;
}



//-----------------------------------------------------------------------------------------------------------\\
//-----------------------------------------------------------------------------------------------------------\\
//-----------------------------------------------------------------------------------------------------------\\
//-----------------------------------------------------------------------------------------------------------\\
//-----------------------------------------------------------------------------------------------------------\\
//for feedback
//is page active?
document.addEventListener("DOMContentLoaded", function() {
    loadFeedback();
});

function submitFeedback() {
    const title = document.getElementById('title').value;
    const feedbackText = document.getElementById('feedback').value;
    //check
    if (!title || !feedbackText) {
        alert('Please enter both feedback title and feedback.');
        return;
    }
    //create the obj
    const feedback = {
        title: title,
        text: feedbackText,
        date: new Date().toLocaleString()
    };

    saveFeedback(feedback);
    loadFeedback();

    document.getElementById('title').value = '';
    document.getElementById('feedback').value = '';
}
//get items that are there under this name and push them
function saveFeedback(feedback) {
    let feedbackList = localStorage.getItem('feedbackList');
    feedbackList = feedbackList ? JSON.parse(feedbackList) : [];

    feedbackList.push(feedback);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
}

function loadFeedback() {
    const feedbackBoard = document.getElementById('feedback-board');
    feedbackBoard.innerHTML = '';

    const feedbackList = localStorage.getItem('feedbackList');
    if (feedbackList) {
        const parsedFeedbackList = JSON.parse(feedbackList);
        //creates new elements within html
        parsedFeedbackList.forEach((feedback, index) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');

            const titleElement = document.createElement('h3');
            titleElement.textContent = `Feedback Title: ${feedback.title}`;

            const textElement = document.createElement('p');
            textElement.textContent = `Feedback: ${feedback.text}`;

            const dateElement = document.createElement('p');
            dateElement.textContent = `Submitted on: ${feedback.date}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Feedback';
            deleteButton.onclick = () => deleteFeedback(index);

            feedbackItem.appendChild(titleElement);
            feedbackItem.appendChild(textElement);
            feedbackItem.appendChild(dateElement);
            feedbackItem.appendChild(deleteButton);

            feedbackBoard.appendChild(feedbackItem);
        });
    }
}
//if this button is pressed, it will get "splice" the item from the list || cut that one item from the list
function deleteFeedback(index) {
    let feedbackList = localStorage.getItem('feedbackList');
    feedbackList = feedbackList ? JSON.parse(feedbackList) : [];

    feedbackList.splice(index, 1);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

    loadFeedback();
}