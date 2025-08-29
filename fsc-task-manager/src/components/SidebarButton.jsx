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
      className={`flex items-center gap-2 w-full rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
