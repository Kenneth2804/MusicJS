const uploadButton = document.getElementById('uploadButton');
const audioFileInput = document.getElementById('audioFile');
const categoryInput = document.getElementById('categoryInput');
const categoriesContainer = document.getElementById('categories');
const audioListContainer = document.getElementById('audioList');

const audioFiles = [];

uploadButton.addEventListener('click', () => {

const file = audioFileInput.files[0];
const category = categoryInput.value || 'Uncategorized';


if (file) {
const audio = new Audio();
audio.src = URL.createObjectURL(file);

 const name = file.name.replace(/\.[^/.]+$/, "");
const audioItem = document.createElement('div');
audioItem.className = 'audio-item';
 audioItem.innerHTML = `
      <audio controls>
        <source src="${audio.src}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <p>${name}</p>
      <p class="category">${category}</p>
    `;

audioListContainer.appendChild(audioItem);
audioFiles.push({ audio, category, name });

updateCategories();
}
});

function updateCategories() {
	const categories = ['all', ...new Set(audioFiles.map(file => file.category))];
	categoriesContainer.innerHTML = '';

	categories.forEach(category => {
		 const button = document.createElement('button');
		 button.textContent = category;
		 button.dataset.category = category;

	 button.addEventListener('click', () => filterAudioByCategory(category));
    categoriesContainer.appendChild(button);
	})
}
function filterAudioByCategory(category) {
audioListContainer.innerHTML = '';

if (category === 'all') {
	 audioFiles.forEach(file => {
      audioListContainer.appendChild(createAudioItem(file));
    });
	}else{
		 const filteredFiles = audioFiles.filter(file => file.category === category);
    filteredFiles.forEach(file => {
      audioListContainer.appendChild(createAudioItem(file));
})
  }
}

function createAudioItem(file) {
	 const audioItem = document.createElement('div');
	   audioItem.className = 'audio-item';
	   audioItem.innerHTML = `
    <audio controls>
      <source src="${file.audio.src}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <p>${file.name}</p>
    <p class="category">${file.category}</p>
  `;
  return audioItem;
}