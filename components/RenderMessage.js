function Message({ message }) {
    console.log(message);
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    console.log(message.content);
    p.textContent = message.content;

    li.append(p);

    return li;
}

export function renderMessages(root) {
    return ({ messages }) => {
        console.log(messages);
        root.innerHTML = '';

        for (const message of messages) {
            const item = Message({ message });
            root.append(item);
        }
    };
}

