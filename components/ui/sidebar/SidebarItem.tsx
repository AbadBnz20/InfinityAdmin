import { SidebarStore } from "@/store/SidebarStore";
import clsx from "clsx";
import NextLink from "next/link";

interface Props {
    title: string;
    icon: React.ReactNode;
    isActive?: boolean;
    href?: string;
  }
export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
    const {OnChange}=SidebarStore()
    const handleClick = () => {
        if (window.innerWidth < 768) {
            OnChange();
        }
      };


  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary-100 [&_svg_path]:fill-primary-500 text-primary-500"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span >{title}</span>
      </div>
    </NextLink>
  )
}
