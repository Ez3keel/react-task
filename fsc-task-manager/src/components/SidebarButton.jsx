const SidebarButton = ({ children, variant }) => {
  const VariantMap = {
    unselected: 'text-gray',
    selected: 'bg-[#E6F7F8] text-brand-primary',
  };

  const variantClasses = VariantMap[variant] || VariantMap[unselected];

  return (
    <a
      href='#'
      className={`flex w-full items-center gap-2 rounded-lg px-6 py-3 ${variantClasses}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;

/*
const SidebarButton = ({ children, variant }) => {
  
  const getVariantClasses = () => {
    if (variant === 'unselected') {
      return 'text-[#353833]';
    }

    if (variant === 'selected') {
      return 'bg-[#E6F7F8] text-[#00ADB5]';
    }
  };

  return (
    <a
      href='#'
      className={`flex w-full items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
*/
