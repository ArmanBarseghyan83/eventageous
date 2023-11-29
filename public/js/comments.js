document.addEventListener("DOMContentLoaded", function () {
    // Get comment section and hide it initially
    var commentSection = document.querySelector(".comment-section");
    commentSection.style.display = "none";
  
    // Get the "Add a Comment" button and attach a click event listener
    var addCommentButton = document.querySelector(".event-container h3");
    addCommentButton.addEventListener("click", function () {
      // Toggle the visibility of the comment section
      if (commentSection.style.display === "none") {
        commentSection.style.display = "block";
      } else {
        commentSection.style.display = "none";
      }
    });
  
    // Prevent the default form submission behavior
    var commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      commentSection.style.display = "none";
    });
  });
  