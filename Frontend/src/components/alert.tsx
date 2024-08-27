import { ReactNode } from "react";

interface Props {
  children: String;
  onClick: () => void;
}

const Alert = ({ children, onClick }: Props) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert" onClick={onClick}>
      <strong>{children}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
