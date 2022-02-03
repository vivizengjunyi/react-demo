import { useEffect, useRef } from "react"
import 'materialize-css/dist/js/materialize.js';

export default function Modal({ title, children, onClose, onSubmit, submitText, cancelText, showModal, closeModal }) {
    const modalRef = useRef(null);
    useEffect(() => {
        const modal = document.querySelector('.modal');
        modalRef.current = window.M.Modal.init(modal, {
            onCloseStart: onClose
        });
    }, []);
    useEffect(() => {
        if (showModal) {
            modalRef.current.open();
        }else{
            modalRef.current.close();
        }
    }, [showModal])
    useEffect(() => {
        if (closeModal) {
            modalRef.current.close();
        }
    }, [closeModal])
    return <div id="app-modal" class="modal">
        <div class="modal-content">
            <h4>{title}</h4>
            <p>{children}</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">{cancelText || 'Cancel'}</a>
            <a href="#!" class="btn-flat" onClick={onSubmit}>{submitText || 'Submit'}</a>
        </div>
    </div>
}