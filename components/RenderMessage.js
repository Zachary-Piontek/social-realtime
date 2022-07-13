function Message({ message }) {
    const li = document.createElement('li');
    li.classList.add('message-container');

    const p = document.createElement('p');
    p.classList.add('message-content');
    p.textContent = message.content;

    li.append(p);
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

export default function createNewMessage(form, { handleNewMessage }) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        await handleNewMessage(
            formData.get('text'),
        );

        form.reset;

    });

    return form;
}
