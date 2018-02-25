const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');
const toggle = player.querySelector('.toggle');

function togglePlay(e) {
  // Since the event listener was added to the player any click will run this function
  // Here we check if the play/pause or video was clicked
  if (e.target.className.includes('viewer') || e.target.className.includes('toggle')) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  } else if (e.target.hasAttribute('data-skip')) {
    video.currentTime += parseFloat(e.target.dataset.skip);
  }
}

let isMouseDown = false;
function handleRangeChange() {
  if (isMouseDown) {
    video[this.name] = this.value;
  }
  video[this.name] = this.value;
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function videoScrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  console.log(scrubTime);
  video.currentTime = scrubTime;
}

player.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', videoScrub);
progress.addEventListener('mousemove', e => isMouseDown && videoScrub(e));
progress.addEventListener('mousedown', () => (isMouseDown = true));
progress.addEventListener('mouseup', () => (isMouseDown = false));

ranges.forEach(range => {
  range.addEventListener('change', handleRangeChange);
  range.addEventListener('mousedown', () => (isMouseDown = true));
  range.addEventListener('mouseup', () => (isMouseDown = false));
  range.addEventListener('mousemove', handleRangeChange);
});
