"use client";
import { SidebarStore } from "@/store/SidebarStore";
import React from "react";
import { Sidebar } from "./sidebarstyle";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import {
  IoAirplaneOutline,
  IoAlbumsOutline,
  IoApps,
  IoBoatOutline,
  IoCall,
  IoCar,
  IoClipboard,
  IoEarth,
  IoFileTrayStacked,
  IoFilter,
  IoGlobe,
  IoHome,
  IoLocationOutline,
  IoPeople,
  IoSwapHorizontalOutline,
} from "react-icons/io5";
import { SidebarMenu } from "./SidebarMenu";
import { Permissions } from "@/interfaces/permissions-interfaces";

interface Props {
  permissions: Permissions[];
}

export const SidebarWrapper = ({ permissions }: Props) => {
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
            <SidebarMenu title="Administracion">
              {permissions.map((permission) => {
                switch (permission.modules.name) {
                  case "Paquetes":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/packages"}
                        title="Paquetes"
                        icon={<IoFileTrayStacked size={"20px"} />}
                        href="packages"
                      />
                    );
                  case "Reservas":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/booking"}
                        title="Reservas"
                        icon={<IoClipboard size={"20px"} />}
                        href="booking"
                      />
                    );
                  case "Traslados":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/transfers"}
                        title="Traslados"
                        icon={<IoSwapHorizontalOutline size={"20px"} />}
                        href="/transfers"
                      />
                    );
                  case "Puntos":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/points"}
                        title="Puntos"
                        icon={<IoFilter size={"20px"} />}
                        href="points"
                      />
                    );
                    case "Viajes":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/journey"}
                          title="Viajes"
                          icon={<IoAirplaneOutline size={"20px"} />}
                          href="journey"
                        />
                      );
                  default:
                    return null;
                }
              })}
              {/* <SidebarItem
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
              /> */}
            </SidebarMenu>

            <SidebarMenu title="General">
              {permissions.map((permission) => {
                switch (permission.modules.name) {
                  case "Usuarios":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/users"}
                        title="Usuarios"
                        icon={<IoPeople size={"20px"} />}
                        href="/users"
                      />
                    );
                  case "Roles":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/roles"}
                        title="Roles"
                        icon={<IoApps size={"20px"} />}
                        href="/roles"
                      />
                    );
                    case "Ciudades":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/city"}
                          title="Ciudades"
                          icon={<IoEarth size={"20px"} />}
                          href="/city"
                        />
                      );
                  case "Celulares":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/phones"}
                        title="Celulares"
                        icon={<IoCall size={"20px"} />}
                        href="/phones"
                      />
                    );
                  case "Estados":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/states"}
                        title="Estados"
                        icon={<IoEarth size={"20px"} />}
                        href="/states"
                      />
                    );
                  case "Paises":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/countries"}
                        title="Paises"
                        icon={<IoEarth size={"20px"} />}
                        href="/countries"
                      />
                    );
                  case "Lenguajes":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/languages"}
                        title="Lenguajes"
                        icon={<IoGlobe size={"20px"} />}
                        href="/languages"
                      />
                    );
                  case "Vehiculos":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/cars"}
                        title="Vehiculos"
                        icon={<IoCar size={"20px"} />}
                        href="/cars"
                      />
                    );
                  case "Categorias":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/category"}
                        title="Categorias de destinos"
                        icon={<IoAlbumsOutline size={"20px"} />}
                        href="/category"
                      />
                    );
                    case "Destinos":
                    return (
                      <SidebarItem
                        key={permission.modules.name}
                        isActive={pathname === "/destinations"}
                        title="Origen/Destinos"
                        icon={<IoLocationOutline size={"20px"} />}
                        href="/destinations"
                      />
                    );
                    case "DestinosYates":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/destinationship"}
                          title="Origen/Destinos Yates"
                          icon={<IoBoatOutline size={"20px"} />}
                          href="/destinationship"
                        />
                      );
                  default:
                    return null;
                }
              })}

              {/* <SidebarItem
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
              /> */}
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
