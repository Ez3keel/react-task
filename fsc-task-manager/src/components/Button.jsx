import { tv } from 'tailwind-variants';

// ✅ Define uma vez só (fora do componente)
const buttonStyles = tv({
  base: 'flex items-center justify-center gap-2 rounded-md px-3 transition hover:opacity-70',
  variants: {
    variant: {
      primary: 'bg-brand-primary text-white',
      ghost: 'bg-transparent text-brand-dark-gray',
      secondary: 'bg-brand-light-gray text-brand-dark-blue',
    },
    size: {
      small: 'py-1 text-xs',
      large: 'py-2 text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});

export default function Button({
  children,
  variant,
  size,
  className,
  ...rest
}) {
  //  Uso correto passando todas as props relevantes
  return (
    <button className={buttonStyles({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

// Define valores padrão nas props (opcional)
Button.defaultProps = {
  variant: 'primary',
  size: 'small',
};


/*
// Button.jsx
export default function Button({
  children,
  variant = 'primary',
  size = 'small',
  className,
  ...rest
}) {
  // Mapeia variantes para classes COMPLETAS do Tailwind
  const variantMap = {
    primary: 'bg-brand-primary text-white', // ✅ Usando a cor do design system
    ghost: 'bg-transparent text-brand-dark-gray',
    secondary: 'bg-brand-light-gray text-brand-dark-blue',
  };

  const sizeMap = {
    small: 'py-1 text-xs px-3',
    large: 'py-2 text-sm px-4',
  };

  // Pega as classes baseadas nas props
  //const variantClasses = variantMap[variant] || variantMap.primary;
  const variantClasses = variantMap[variant] || variantMap.primary;
  const sizeClasses = sizeMap[size] || sizeMap.small;

  return (
    <button
      className={`${className} ${variantClasses} ${sizeClasses} flex items-center justify-center gap-2 rounded-md transition hover:opacity-70`}
      {...rest}
    >
      {children}
    </button>
  );
}
*/
