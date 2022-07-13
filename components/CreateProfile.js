import { createProfile } from '../services/client.js';

const createProfiles = document.getElementById('profile-form');
createProfiles.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(createProfiles);
    await createProfile({
        name: data.get('id'),
    });

    location.replace('/');
});