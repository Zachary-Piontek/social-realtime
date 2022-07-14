import { getUser, signOut } from './services/auth-service.js';
import { checkProfile, protectPage } from './utils.js';
import createUser from './components/User.js';
import { getMessages, getProfile, liveUpdate, newMessage } from './services/message-service.js';
import { renderMessages } from './components/RenderMessage.js';
import { createNewMessage } from './components/NewMessage.js';
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

    console.log(profile);

    
    messages = await getMessages();
    console.log(messages);
    

    liveUpdate(mess => {
        messages.unshift(mess);
        display();
    });

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleNewMessage(input) {
    console.log(input);
    await newMessage(input, profile.id);
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
    Messages({ messages });
    NewMessage();
}

handlePageLoad();
