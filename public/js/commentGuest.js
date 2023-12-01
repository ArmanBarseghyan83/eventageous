const addComment = document.querySelector('.comments-content button');
const commentsContent = document.querySelector('.comments-content');
const commentformWrapper = document.querySelector('.comment-form-wrapper');
const submitComment = document.querySelector('.comment-form button');
const commentContent = document.querySelector('.comment-form textarea');
const guestInput = document.querySelector('#guest-form input');
const guestForm = document.querySelector('#guest-form');

//Get the data from the user input and fetch the backend api for creating a new comment.
const addCommentHundler = async (e) => {
  e.preventDefault();
  const content = commentContent.value.trim();
  const eventId = submitComment.dataset.eventid;
  console.log(eventId, content);
  if (content) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, eventId }),
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

const addGuest = async (e) => {
  e.preventDefault();

  const event_id = guestInput.value.trim();

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

addComment.addEventListener('click', () => {
  commentsContent.classList.add('hide');
  commentformWrapper.classList.remove('hide');
});

submitComment.addEventListener('click', addCommentHundler);

guestForm.addEventListener('submit', addGuest);
