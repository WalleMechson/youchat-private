"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItem {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({ icon: Icon, href, onClick, active }: DesktopItem) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
            group
            flex
            gap-x-3
            rounded-md
            w-full
            p-4
            justify-center
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100    
        `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default DesktopItem;
