import React from 'react';

interface BigButtonProps {
  label: string;
  color: string;
  language: string;
  onClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allows for any arbitrary props
}

const translations: { [key: string]: string } = {
  en: 'Click Me',
  es: 'Haz clic',
  fr: 'Cliquez moi'
};

const BigButton: React.FC<BigButtonProps> = ({ label, color, language, onClick, ...props }) => {
  const dataTestId = props["data-testid"]
    ? `big-button-${props["data-testid"]}`
    : "big-button";

  return (
    <button
      name={`button-${label}`}
      value={label + "?"}
      style={{ backgroundColor: color }}
      className="btn btn-primary"
      onClick={onClick}
      {...props} // Spread the remaining props here
      data-testid={dataTestId}
      data-language={language}
      data-translation={translations[language] || label}
    >
      {label}
    </button>
  );
};

export { BigButton };
export type { BigButtonProps };
