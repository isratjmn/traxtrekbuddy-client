import Image from 'next/image';

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: 'btn_green' | 'btn_white_text';
    full?: boolean;
};

const Button = ({ type, title, icon, variant, full }: ButtonProps) => {
    const baseStyles = 'flex items-center justify-center gap-3 rounded-lg px-6 py-3 font-semibold transition-all duration-300';

    const variants = {
        btn_green: 'bg-green-500 text-white hover:bg-green-600',
        btn_white_text: 'bg-white text-black border border-green hover:bg-gray-100',
    };

    const iconColor = variant === 'btn_white_text' ? 'text-white' : 'text-black';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${full ? 'w-full' : ''}`}
            type={type}
        >
            {icon && <Image src={icon} alt={title} width={28} height={24} className={iconColor} />}
            <span className="whitespace-nowrap">{title}</span>
        </button>
    );
};

export default Button;
