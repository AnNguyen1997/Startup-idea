var modal;
var registerContainer;
var closeButton;

window.onload = function() {
    modal = document.getElementById('modal-signup-id');
    registerContainer = document.getElementById('register-container');
    closeButton = document.getElementById('closeButton');
    let loginUser = document.querySelector("#login-username");
    let loginAlert = document.querySelector("#login-alert");
    let registerUser = document.querySelector("#register-username");
    let registerAlert = document.querySelector("#register-alert");
    
    
    
    loginUser.addEventListener("focusout", function() {checkUsernameLogin(this, loginAlert);} );
    loginUser.addEventListener("focus", function() {clearAlert(loginUser, loginAlert);} );
    
   
    registerUser.addEventListener("focusout", function() {checkUsernameRegister(this, registerAlert);} );
    registerUser.addEventListener("focus", function() {clearAlert(registerUser, registerAlert);} );
};





openModal = function() {
    modal.style.display = 'flex';
    registerContainer.style.display = 'none';
};



closeModal = function() {
    modal.style.display = 'none';
    registerContainer.style.display = 'flex';
};


window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
        registerContainer.style.display = 'flex';
    };
};
