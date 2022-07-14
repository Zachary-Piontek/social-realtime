function Message({ message }) {
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    p.textContent = message.content;

    const username = document.createElement('h3');
    username.textContent = message.username;

    li.append(p, username);
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

