import React from 'react';
import '../../styles/forms.css';

function Mainforms({
  title,
  description,
  fields = [],
  buttonText,
  onSubmit,
  footerText,
  footerLink,
  footerLinkHref,
  showRememberMe = false,
  onRememberChange,
  forgetPasswordHref = '#'
}) {
  return (
    <div className="bg-white p-5 form-text">
      <h4 className="mb-3 fw-bold">{title}</h4>
      <p>{description}</p>

      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div className="mb-3" key={index}>
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              placeholder={field.placeholder}
              required={field.required}
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        ))}

        {showRememberMe && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                onChange={onRememberChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a
              href={forgetPasswordHref}
              className="text-decoration-none small text-primary"
            >
              Forgot Password?
            </a>
          </div>
        )}

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-teal ">
            {buttonText}
          </button>
        </div>
      </form>

      {footerText && footerLink && footerLinkHref && (
        <div className="mt-2 text-center">
          {footerText}{' '}
          <a href={footerLinkHref} className="text-primary">
            {footerLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default Mainforms;
