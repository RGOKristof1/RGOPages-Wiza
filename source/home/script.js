document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.music-card');
    
    let currentlyPlayingAudio = null;
    let playbackTimeout = null;
    let currentActiveCard = null;

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent click event if the user is clicking the "Buy Now" button
            if (e.target.classList.contains('buy-btn')) return;

            // If this card is already exhausted (greyed out), do nothing
            if (this.classList.contains('greyed-out')) return;

            const audio = this.querySelector('audio');

            // If there's another track playing, stop it and clear its timeout
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                currentlyPlayingAudio.pause();
                currentlyPlayingAudio.currentTime = 0;
                if (currentActiveCard) {
                    currentActiveCard.classList.remove('playing');
                }
                clearTimeout(playbackTimeout);
            }

            // Toggle play/pause for the clicked card
            if (audio.paused) {
                audio.currentTime = 0;
                audio.play();
                this.classList.add('playing');
                
                currentlyPlayingAudio = audio;
                currentActiveCard = this;

                // Stop the audio automatically after 10 seconds (10000 ms)
                playbackTimeout = setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0; // Reset
                    
                    // Update visual state
                    this.classList.remove('playing');
                    this.classList.add('greyed-out');
                    
                    // Clear references
                    currentlyPlayingAudio = null;
                    currentActiveCard = null;
                }, 10000);

            } else {
                // Manually pausing before the 10 seconds is up
                audio.pause();
                this.classList.remove('playing');
                clearTimeout(playbackTimeout);
                currentlyPlayingAudio = null;
                currentActiveCard = null;
            }
        });
    });

    // Optional: Enable mouse-wheel horizontal scrolling for the cards container
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        cardsContainer.scrollLeft += evt.deltaY;
    });
});