import { tv } from 'tailwind-variants';


const sidebar = tv({
  base: 'flex w-full items-center gap-2 rounded-lg px-6 py-3 ',
  variants: {
    color: {
      selected: 'bg-brand-primary bg-opacity-15 text-brand-primary',
      unselected: 'text-brand-dark-blue',
    },
  }

})


const SidebarButton = ({ children, variant }) => {
  
  return (
    <a
      href='#'
      className={sidebar(variant)}
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
