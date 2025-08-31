// Button.jsx
export default function Button({ children, variant = 'primary' }) {
  const getVariantClasses = () => {
    if (variant === 'primary'){
      return 'bg-[#00ACB5] text-white'
    }
      if (variant === 'ghost'){
      return 'bg-transparent text-[#818181]'
    }
  }

  return (
    <button className={`${getVariantClasses()} rounded-md px-3 py-1 flex items-center gap-2 text-xs`}>
      {children}
    </button>
  );
}
