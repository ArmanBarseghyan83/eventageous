//Get the data from the user inputs and fetch the backend api for login the user.
const loginFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password-login').value.trim();
  const username = document.querySelector('#username-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

//Get the data from the user inputs and fetch the backend api for creating a new user.
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

//  Switch between login and sign up  forms
document.querySelectorAll('.instead').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    document
      .querySelectorAll('.form-wrapper')
      .forEach((el) => el.classList.remove('hide'));
    e.target.parentElement.parentElement.parentElement.classList.add('hide');
  });
});
