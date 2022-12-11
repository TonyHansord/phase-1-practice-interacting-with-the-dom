document.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter');
  const pause = document.getElementById('pause');
  const buttons = document.querySelectorAll('button');
  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const like = document.getElementById('heart');
  const likesList = document.querySelector('ul');
  const form = document.querySelector('form');

  let isPaused = false;
  counter.textContent = 0;

  const likedNums = {};

  let counterInterval = setInterval(() => counter.textContent++, 1000);

  const pauseTimer = () => {
    isPaused = true;
    clearInterval(counterInterval);
    buttons.forEach((button) => {
      if (button.id !== 'pause') {
        button.disabled = true;
      } else {
        pause.textContent = 'Resume';
      }
    });
  };

  const resumeTimer = () => {
    isPaused = false;
    counterInterval = setInterval(() => counter.textContent++, 1000);
    buttons.forEach((button) => (button.disabled = false));
    pause.textContent = 'Pause';
  };

  const likeNumber = (currentNum) => {
    // const likedNums = {
    //   0: {
    //     likes: 0,
    //   },
    // };

    if (currentNum in likedNums) {
      // update like count
      likedNums[currentNum].likes++;
      let currentItem = document.getElementById(currentNum); //get list item with id of current num
      // log count to DOM
      currentItem.textContent = `${currentNum} has been liked ${likedNums[currentNum].likes} times`;
    } else {
      //if number is not in object
      likedNums[currentNum] = { likes: 1 };
      let likesItem = document.createElement('li');
      likesItem.id = currentNum; //create id to refer to when pressed multiple times
      // log count to DOM
      likesItem.textContent = `${currentNum} has been liked ${likedNums[currentNum].likes} times`;
      likesList.appendChild(likesItem);
    }
  };

  const showComments = (comment) => {
    const commentsList = document.getElementById('list');
    const commentItem = document.createElement('p');
    commentItem.textContent = comment;
    commentsList.appendChild(commentItem);
  };

  pause.addEventListener('click', () =>
    isPaused ? resumeTimer() : pauseTimer()
  );
  minus.addEventListener('click', () => counter.textContent--);
  plus.addEventListener('click', () => counter.textContent++);
  like.addEventListener('click', () => {
    likeNumber(counter.textContent);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('comment-input');
    showComments(input.value);
    form.reset();
  });
});
