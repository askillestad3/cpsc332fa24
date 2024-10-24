"use strict";

let viewedCount = 0;
let removeMode = false;

const newArtworks = [
    { title: 'The Scream', artist: 'Edvard Munch', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg' },
    { title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg' },
    { title: 'The Birth of Venus', artist: 'Sandro Botticelli', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Birth_of_Venus_%28Botticelli%29_%28Uffizi%29.jpg' },
    { title: 'The Night Watch', artist: 'Rembrandt van Rijn', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Rembrandt_van_Rijn_-_De_Nachtwacht.jpg' },
    { title: 'The Kiss', artist: 'Gustav Klimt', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Gustav_Klimt_016.jpg' },
    { title: 'American Gothic', artist: 'Grant Wood', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Grant_DeVolson_Wood_-_American_Gothic.jpg' },
    { title: 'Las Meninas', artist: 'Diego Velázquez', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Las_Meninas_01.jpg' },
    { title: 'The Last Supper', artist: 'Leonardo da Vinci', img: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Da_Vinci_The_Last_Supper_high_res.jpg' },
    { title: 'Water Lilies', artist: 'Claude Monet', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Claude_Monet_-_Nymph%C3%A9as_%28detail%29_2.jpg' },
    { title: 'Starry Night Over the Rhône', artist: 'Vincent van Gogh', img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Starry_Night_Over_the_Rhone.jpg' }
];

// function to update viewed counter
function updateCounter() {
    document.getElementById('counter').textContent = `Artworks Viewed: ${viewedCount}`;
}

// function to handle art panel clicks
function handlePanelClick(event) {
    if (removeMode) {
        event.currentTarget.remove();
    } else if (!event.currentTarget.classList.contains('viewed')) {
        event.currentTarget.classList.add('viewed');
        viewedCount++;
        updateCounter();
    }
}

// function to reset gallery
function resetGallery() {
    const panels = document.querySelectorAll('.art-panel');
    panels.forEach(panel => {
        panel.classList.remove('viewed');
    });
    viewedCount = 0;
    updateCounter();
}

// function to add new artwork
function addNewArtwork() {
    const randomArt = newArtworks[Math.floor(Math.random() * newArtworks.length)];
    const artGrid = document.querySelector('.art-grid');

    const newPanel = document.createElement('div');
    newPanel.classList.add('art-panel');
    newPanel.innerHTML = `
        <img src="${randomArt.img}" alt="${randomArt.title}">
        <p>${randomArt.title} by ${randomArt.artist}</p>
    `;
    newPanel.addEventListener('click', handlePanelClick);
    artGrid.appendChild(newPanel);
}

// BONUS - remove mode
// function to toggle remove mode/button
function toggleRemoveMode() {
    removeMode = !removeMode;
    const removeButton = document.getElementById('remove-mode-button');
    removeButton.classList.toggle('active');
    removeButton.textContent = removeMode ? 'Cancel Remove Mode' : 'Remove Artwork';
}

// event listeners for DOM
document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.art-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', handlePanelClick);
    });

    document.getElementById('reset-button').addEventListener('click', resetGallery);
    document.getElementById('add-art-button').addEventListener('click', addNewArtwork);
    document.getElementById('remove-mode-button').addEventListener('click', toggleRemoveMode);
});