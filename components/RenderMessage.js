function Message({ message }) {
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    p.textContent = message.content;

    const username = document.createElement('h3');
    username.textContent = message.user.profile_name;

    li.append(p, username);
    
    return li;
}

export function renderMessages(root) {
    return ({ messages }) => {
        root.innerHTML = '';

        for (const message of messages) {
            console.log(message);
            const item = Message({
                message
            });
            root.append(item);
        }
    };
}

