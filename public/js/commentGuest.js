const addComment = document.querySelector('#add-comment');
const deleteComment = document.querySelectorAll('.delete-comment');
const editComment = document.querySelectorAll('.edit-comment');
const commentsContent = document.querySelector('.comments-content');
const commentformWrapper = document.querySelector('.comment-form-wrapper');
const submitComment = document.querySelector('#submit-comment');
const cancelComment = document.querySelector('#cancel-comment');
const commentContent = document.querySelector('.comment-form textarea');
const guestInput = document.querySelector('#guest-form input');
const guestSignUp = document.querySelector('#guest-signup');
const guestSignout = document.querySelector('#guset-signout');

//Get the data from the user input and fetch the backend api for creating a new comment, or editing.
const addCommentHandler = async (e) => {
  e.preventDefault();
  const content = commentContent.value.trim();
  const eventId = submitComment.dataset.eventid;
  const id = document.querySelector('#comment-id').value;

  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, eventId, id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If no id means a new comment was created, else the comment was updated.
        if (!id) {
          document.location.reload();
        } else {
          editComment.forEach((el) => {
            if (el.dataset.commentid === id) {
              el.previousElementSibling.previousElementSibling.innerHTML = `${content} <span class="text-secondary">(edited)</span>`;
              commentformWrapper.classList.add('hide');
              console.log(el.previousElementSibling.previousSibling);
            }
          });
        }
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

// Get the id of the comment saved in data attribute and fetch the backend api to delete that comment.
const deleteCommentHandler = async (el) => {
  const confirm = window.confirm('Are you sure?');

  if (confirm) {
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
  }
};

// Open the form for editing the comment and prepopulate the inputs using data saved in the data attributes.
const editCommentHandler = (el) => {
  commentformWrapper.classList.remove('hide');
  commentContent.value = el.dataset.commentcontent;
  document.querySelector('#comment-id').value = el.dataset.commentid;
};

// Close the comment form when canceled.
const cancelCommentHandler = () => {
  commentformWrapper.classList.add('hide');
  addComment.classList.remove('hide');
};

// Get the data from the user input and fetch the backend api for creating a new guest.
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

// Get the id of the guest saved in data attribute and fetch the backend api to delete that guest.
const deleteGuestHandler = async (e) => {
  e.preventDefault();
  const event_id = guestSignout.dataset.eventid;

  try {
    const response = await fetch('/api/guests', {
      method: 'DELETE',
      body: JSON.stringify({ event_id }),
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

addComment.addEventListener('click', () => {
  document.querySelector('#comment-id').value = '';
  commentContent.value = '';
  commentformWrapper.classList.remove('hide');
  addComment.classList.add('hide');
});

deleteComment.forEach((el) => {
  el.addEventListener('click', () => {
    deleteCommentHandler(el);
  });
});

editComment.forEach((el) => {
  el.addEventListener('click', () => {
    editCommentHandler(el);
  });
});

submitComment?.addEventListener('click', addCommentHandler);

cancelComment?.addEventListener('click', cancelCommentHandler);

guestSignUp?.addEventListener('click', addGuestHandler);

guestSignout?.addEventListener('click', deleteGuestHandler);
