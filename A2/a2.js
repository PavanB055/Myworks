const video = document.getElementById('video');
const SCROLL_SPEED = 1; // Adjust this for more slowing effect

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;

    // Ensures scrollFraction reaches exactly 1 at the bottom
    let scrollFraction = Math.min(scrollPosition / maxScroll, 1);

    // Apply progressive slowing but ensure it reaches 1
    let easedScrollFraction = 1 - (1 - scrollFraction) ** SCROLL_SPEED;

    let videoDuration = video.duration || 1;
    
    // Ensure it reaches full duration without cutting
    video.currentTime = Math.min(easedScrollFraction * videoDuration, videoDuration - 0.1);
});