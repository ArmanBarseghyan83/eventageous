const addComment = document.querySelector('#add-comment');
const deleteComment = document.querySelectorAll('.delete-comment');
const editComment = document.querySelectorAll('.edit-comment');
const commentsContent = document.querySelector('.comments-content');
const commentformWrapper = document.querySelector('.comment-form-wrapper');
const submitComment = document.querySelector('.comment-form button');
const commentContent = document.querySelector('.comment-form textarea');
const guestInput = document.querySelector('#guest-form input');
const guestSignUp = document.querySelector('#guest-signup');
const guestSignout = document.querySelector('#guset-signout');

//Get the data from the user input and fetch the backend api for creating a new comment.
const addCommentHandler = async (e) => {
  e.preventDefault();
  const content = commentContent.value.trim();
  const eventId = submitComment.dataset.eventid;
  const id = document.querySelector('#comment-id').value

  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, eventId, id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to comment.');
      }
    } catch (e) {
      alert('Failed to comment.');
    }
  } else {
    alert('Fill out the form.');
  }
};

const deleteCommentHandler = async (el) => {
  const id = el.dataset.commentid;

  try {
    const response = await fetch('/api/comments', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      el.parentElement.remove();
    } else {
      alert('Failed to Delete.');
    }
  } catch (e) {
    alert('Failed to Delete.');
  }
};

const editCommentHandler = (el) => {

  commentsContent.classList.add('hide');
  commentformWrapper.classList.remove('hide');

  commentContent.value = el.dataset.commentcontent
  document.querySelector('#comment-id').value = el.dataset.commentid
}

//Get the data from the user input and fetch the backend api for creating a new guest.
const addGuestHandler = async (e) => {
  e.preventDefault();

  const event_id = guestSignUp.dataset.eventid;

  if (event_id) {
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        body: JSON.stringify({ event_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Guest already exists!');
      }
    } catch (e) {
      alert('Failed to Sign Up.');
    }
  }
};

const deleteGuestHandler = async (e) => {
  e.preventDefault();
  const id = guestSignout.dataset.guestid;

  try {
    const response = await fetch('/api/guests', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to Delete.');
    }
  } catch (e) {
    alert('Failed to Delete.');
  }
};

// Toggle between comments form and comments content elements 
addComment.addEventListener('click', () => {
  commentsContent.classList.add('hide');
  commentformWrapper.classList.remove('hide');
});

deleteComment.forEach((el) => {
  el.addEventListener('click', () => {
    deleteCommentHandler(el);
  });
});

editComment.forEach((el) => {
  el.addEventListener('click', () => {
    editCommentHandler(el)
  });
});

submitComment?.addEventListener('click', addCommentHandler);

guestSignUp?.addEventListener('click', addGuestHandler);

guestSignout?.addEventListener('click', deleteGuestHandler);
