import { useState } from 'react';

export default function useModal(url) {
    const [openedModal, setOpenedModal] = useState(false);

    const closeModal = () => setOpenedModal(false);
    const openModal = () => setOpenedModal(true);

    return {
        openedModal,
        openModal,
        closeModal,
    };
}
