import { getUser, signOut } from './services/auth-service.js';
import { checkProfile, protectPage } from './utils.js';
import createUser from './components/User.js';
import { getMessages, getProfile, newMessage } from './services/message-service.js';
import { renderMessages } from './components/RenderMessage.js';
import createNewMessage from './components/NewMessage.js';
// State
let user = null;
let profile = null;
let messages = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);
    
    // profile = await getProfile();
    // checkProfile(profile);
    
    messages = await getMessages();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleNewMessage(input) {
    await newMessage(input);
    display();
}

// Components 


const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);
const Messages = renderMessages(document.querySelector('#chat-container'));

const NewMessage = createNewMessage(
    document.querySelector('#user-input'),
    { handleNewMessage }
);

function display() {
    User({ user });
    NewMessage();
    Messages({ messages });
}

handlePageLoad();
