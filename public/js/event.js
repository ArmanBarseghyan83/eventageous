//Get the data from the user inputs and fetch the backend api for updating the event.
const updateEventHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#event-title').value.trim();
  const address = document.querySelector('#event-address').value.trim();
  const description = document.querySelector('#event-description').value.trim();
  const id = +location.href.split('/')[location.href.split('/').length - 1];
  if (title && address && description) {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, address, description }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update.');
      }

    } catch (e) {
      alert('Failed to update.');
    }
  } else {
    alert('Fill out the form.');
  }
};

//Get the event id from the url and fetch the backend api for deleting the event.
const deleteEventHandler = async () => {
  const confirm = window.confirm('Are you sure?');
  if (confirm) {

    const delEl = document.querySelector('#delete-event')
    const id = delEl.dataset.id

    try {
      const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete.');
      }
    } catch (e) {
      alert('Failed to delete.');
    }
  }
};

document
  .querySelector('#update-event')
  ?.addEventListener('click', updateEventHandler);

document
  .querySelector('#delete-event')
  ?.addEventListener('click', deleteEventHandler);
