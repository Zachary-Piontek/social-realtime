function Message({ message }) {
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    p.textContent = message.content;

    const p1 = document.createElement('p');
    p1.textContent = message.user.profile_name;

    li.append(p, p1);

    return li;
}

export function renderMessages(root) {
    return ({ messages }) => {
        console.log(messages);
        root.innerHTML = '';

        for (const message of messages) {
            const item = Message({
                message
            });


            root.append(item);
        }
    };
}

