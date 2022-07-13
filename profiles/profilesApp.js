import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import { getProfile } from '../services/message-service.js';
import createUser from '../components/User.js';
import createProfileUpdate from '../components/UpdateProfile.js';
import { updateProfile } from '../services/message-service.js';

// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleProfileUpdate() {
    await updateProfile(profile);
    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Profile = createProfileUpdate(
    document.querySelector('#profile-form'),
    { handleProfileUpdate }
);

function display() {
    User({ user });
    Profile({ user, profile });
}

handlePageLoad();