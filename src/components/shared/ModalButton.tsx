export default function ModalButton({ buttonLabel, children, onAccept }) {
  return (
    <>
      <label htmlFor={buttonLabel} className="btn modal-button">
        {buttonLabel}
      </label>
      <input type="checkbox" id={buttonLabel} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>{children}</p>
          <div className="modal-action">
            <label htmlFor={buttonLabel} className="btn btn-primary" onClick={onAccept}>
              Accept
            </label>
            <label htmlFor={buttonLabel} className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
