// Button.jsx
export default function Button({ children, variant = 'primary' }) {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00ACB5] text-white';
    }
    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]';
    }
  };

  return (
    <button
      className={`${getVariantClasses()} flex items-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-70`}
    >
      {children}
    </button>
  );
}
