const modalsDiv = document.querySelector('.modals');
const modalTargetBtns = document.querySelectorAll('[data-path]');
const modalItems = document.querySelectorAll('.item-modal');
const body = document.querySelector("body");

if (modalTargetBtns.length > 0) {
    for (let i = 0; i < modalTargetBtns.length; i++) {
        const element = modalTargetBtns[i];
        element.addEventListener("click", function (e) {
            const modalId = e.target.closest('[data-path]').dataset.path
            if (modalItems && modalId) {
                modalItems.forEach(modal => {
                    if (modal.id === modalId) {
                        modalsDiv.classList.add('modal-open');
                        modal.classList.add('visible');
                        body.style.overflow = 'hidden';

                        const modalCloseBtn = modal.querySelector('.item-modal__close-btn');
                        if (modalCloseBtn) {
                            modalCloseBtn.addEventListener("click", function (e) {
                                modal.classList.remove('visible');
                                modalsDiv.classList.remove('modal-open');
                                body.style.overflow = 'auto';
                            });
                        }
                    }
                    if (modal.classList.contains('visible') && modal.id !== modalId) {
                        modal.classList.remove('visible');
                    }
                })
            }
        });
    }
}