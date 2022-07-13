import { getUser, signOut } from './services/auth-service.js';
import { checkProfile, protectPage } from './utils.js';
import createUser from './components/User.js';
import { getProfile } from './services/message-service.js';

// State
let user = null;
let profile = null;
let messages = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    profile = await getProfile();
    checkProfile(profile);
    
    messages = await getPosts();

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

function display() {
    User({ user });

}

handlePageLoad();
