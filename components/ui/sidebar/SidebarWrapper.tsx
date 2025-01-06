"use client";
import { SidebarStore } from "@/store/SidebarStore";
import React from "react";
import { Sidebar } from "./sidebarstyle";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import {
  IoApps,
  IoCall,
  IoCar,
  IoClipboard,
  IoEarth,
  IoFileTrayStacked,
  IoFilter,
  IoGlobe,
  IoHome,
  IoPeople,
  IoSwapHorizontalOutline,
} from "react-icons/io5";
import { SidebarMenu } from "./SidebarMenu";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { state, OnChange } = SidebarStore();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {state ? <div className={Sidebar.Overlay()} onClick={OnChange} /> : null}
      <div
        className={Sidebar({
          collapsed: state,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                Dashboard
              </h3>
              <span className="text-xs font-medium text-default-500">
                admin
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<IoHome size={"20px"} />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/users"}
                title="Usuarios"
                icon={<IoPeople size={"20px"} />}
                href="users"
              />
              <SidebarItem
                isActive={pathname === "/roles"}
                title="Roles"
                icon={<IoApps size={"20px"} />}
                 href="roles"
              />
              <SidebarItem
                isActive={pathname === "/phones"}
                title="Celulares"
                icon={<IoCall size={"20px"} />}
                href="phones"
              />
              <SidebarItem
                isActive={pathname === "/states"}
                title="Estados"
                icon={<IoEarth size={"20px"} />}
                href="states"
              />

              <SidebarItem
                isActive={pathname === "/countries"}
                title="Paises"
                icon={<IoEarth size={"20px"} />}
                href="countries"
              />
              <SidebarItem
                isActive={pathname === "/languages"}
                title="Lenguajes"
                icon={<IoGlobe size={"20px"} />}
                href="languages"
              />
              <SidebarItem
                isActive={pathname === "/cars"}
                title="Vehiculos"
                icon={<IoCar size={"20px"} />}
                href="cars"
              />
            </SidebarMenu>

            <SidebarMenu title="Administracion">
              <SidebarItem
                isActive={pathname === "/packages"}
                title="Paquetes"
                href="packages"
                icon={<IoFileTrayStacked size={"20px"} />}
              />
              <SidebarItem
                isActive={pathname === "/booking"}
                title="Reservas"
                href="booking"
                icon={<IoClipboard size={"20px"} />}
              />
              <SidebarItem
                isActive={pathname === "/transfers"}
                title="Traslados"
                href="transfers"
                icon={<IoSwapHorizontalOutline size={"20px"} />}
              />
               <SidebarItem
                isActive={pathname === "/points"}
                title="Puntos"
                href="points"
                icon={<IoFilter size={"20px"} />}
              />
            </SidebarMenu>

          
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
