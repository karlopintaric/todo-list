export default function Modal(dialogId, onOpenCallback, onCloseCallback) {
    const dialog = document.querySelector(dialogId);
    dialog.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Escape') {
            e.preventDefault();
            close();
        }
    });

    const open = () => {
        dialog.showModal();
        onOpenCallback();
    };

    const close = () => {
        dialog.close('');
        onCloseCallback();
    }

    const getElement = () => dialog;

    return {
        open,
        close,
        getElement
    }
}
