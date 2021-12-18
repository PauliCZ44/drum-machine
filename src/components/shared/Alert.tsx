function Alert({ children, alertClass = 'alert-info' }) {
  return (
    <div className="fade-in-right min-w-40">
      <div className={`alert ${alertClass}`}>
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#2196f3"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <label>{children}</label>
        </div>
      </div>
    </div>
  );
}

export default Alert;
