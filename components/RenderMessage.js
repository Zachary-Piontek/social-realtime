function Message({ message }) {
    console.log(message);
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    console.log(message.content);
    p.textContent = message.content;


    const username = document.createElement('h3');
    username.textContent = message.username;

    li.append(p, username);
    
    return li;

    li.append(p);

}

export function renderMessages(root) {
    return ({ messages }) => {
        console.log(messages);
        root.innerHTML = '';

        for (const message of messages) {

            console.log(message);
            const item = Message({
                message
            });

            const item = Message({ message });

            root.append(item);
        }
    };
}

