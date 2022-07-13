import { getUser, signOut, getProfile } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createProfile from '../components/CreateProfile.js';

// State
let user = null;
let profile;

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

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Profile = createProfile(document.querySelector(''));

function display() {
    User({ user });
    Profile({ user, profile });
}

handlePageLoad();