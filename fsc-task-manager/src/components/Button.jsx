// Button.jsx
export default function Button({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00ACB5] text-white';
    }
    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]';
    }
    if (variant == 'secondary') {
      return 'bg-[#EEEEEE] text-[#35383E]';
    }
  };

  const getSizeClasses = () => {
    if (size === 'small') {
      return 'py-1 text-xs';
    }
    if (size === 'large') {
      return 'py-2 text-sm';
    }
  };

  return (
    <button
      className={`${className} ${getVariantClasses()} ${getSizeClasses()} flex items-center justify-center gap-2 rounded-md px-3 transition hover:opacity-70`}
      // Assim ele vai passar todas as props para o button sem precisar citar cada uma inclusive o onClick
      {...rest}
    >
      {children}
    </button>
  );
}
