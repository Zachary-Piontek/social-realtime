export function createNewMessage(form, { handleNewMessage }) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        await handleNewMessage(
            formData.get('input')
        );

        form.reset();
    });

    return () => { };
}