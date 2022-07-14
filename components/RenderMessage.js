function Message({ message }) {
    const li = document.createElement('li');
    li.classList.add('message-container');
    
    const p1 = document.createElement('p');
    p1.classList.add('profile-name-display');
    p1.textContent = message.user.profile_name;

    const p = document.createElement('p');
    p.classList.add('message-content');
    p.textContent = message.content;


    li.append(p1, p);

    return li;
}

export function renderMessages(root) { 
    return ({ messages }) => {
        root.innerHTML = '';

        for (const message of messages) {
            const item = Message({
                message
            });


            root.append(item);
        }
    };
}

