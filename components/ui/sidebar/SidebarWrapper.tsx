"use client";
import { SidebarStore } from "@/store/SidebarStore";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./sidebarstyle";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import {
  IoAirplaneOutline,
  IoAlbumsOutline,
  IoApps,
  IoBoatOutline,
  IoBusinessOutline,
  IoCall,
  IoCar,
  IoCarSportOutline,
  IoClipboard,
  IoEarth,
  IoFileTrayStacked,
  IoFileTrayStackedOutline,
  IoFilter,
  IoGlobe,
  IoHome,
  IoLayersOutline,
  IoLocationOutline,
  IoPeople,
  IoSparklesOutline,
  IoSwapHorizontalOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SidebarMenu } from "./SidebarMenu";
import { Permissions } from "@/interfaces/permissions-interfaces";
import { useTheme } from "next-themes";

interface Props {
  permissions: Permissions[];
}

export const SidebarWrapper = ({ permissions }: Props) => {
  const pathname = usePathname();
  const { state, OnChange } = SidebarStore();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marca el componente como montado
  }, []);
  const image =
    theme === "dark"
      ? "https://res.cloudinary.com/devz7obre/image/upload/v1744926909/logo1dark_xmwuhb.png"
      : "https://res.cloudinary.com/devz7obre/image/upload/v1744321737/logo1_v9yswm.png";

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {state ? <div className={Sidebar.Overlay()} onClick={OnChange} /> : null}
      <div
        className={Sidebar({
          collapsed: state,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center gap-2 w-full">
            <div className="grid justify-center  gap-4 w-full">
              {mounted && (
                <img
                  src={image}
                  alt="Infinity Luxury Travel Logo"
                  
                  className="h-16 w-16 object-fill"
                />
              )}
              {/* <div className="col-span-2">
                <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                  Dashboard
                </h3>
                <span className="text-xs font-medium text-default-500">
                  admin
                </span>
              </div> */}
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
            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "Paquetes":
                case "Reservas":
                case "Puntos":
                  return true; // Si alguno de estos casos es válido, renderiza el SidebarMenu
                default:
                  return false;
              }
            }) && (
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
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}

            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "Usuarios":
                case "Socios":
                case "Departamentos":
                case "Puestos":
                case "Roles":
                case "Ciudades":
                case "Ubicaciones":
                case "Celulares":
                case "Estados":
                case "Paises":
                case "Lenguajes":
                  return true;
                default:
                  return false;
              }
            }) && (
              <SidebarMenu title="General">
                {permissions.map((permission) => {
                  switch (permission.modules.name) {
                    case "Usuarios":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/users"}
                          title="Administradores"
                          icon={<IoPeople size={"20px"} />}
                          href="/users"
                        />
                      );
                    case "Socios":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/partner"}
                          title="Socios"
                          icon={<IoPeople size={"20px"} />}
                          href="/partner"
                        />
                      );
                    case "Departamentos":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/departments"}
                          title="Departamentos"
                          icon={<IoBusinessOutline size={"20px"} />}
                          href="/departments"
                        />
                      );
                    case "Puestos":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/position"}
                          title="Puestos"
                          icon={<IoBusinessOutline size={"20px"} />}
                          href="/position"
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
                    case "Ubicaciones":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/location"}
                          title="Locación"
                          icon={<IoLocationOutline size={"20px"} />}
                          href="/location"
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
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}

            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "Atracciones":
                case "CategoriaAutos":
                case "Viajes":
                  return true; // Si alguno de estos casos es válido, renderiza el SidebarMenu
                default:
                  return false;
              }
            }) && (
              <SidebarMenu title="Mi Viaje Perfecto">
                {permissions.map((permission) => {
                  switch (permission.modules.name) {
                    case "Atracciones":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/attractions"}
                          title="Atracciones"
                          icon={<IoSparklesOutline size={"20px"} />}
                          href="/attractions"
                        />
                      );
                    case "CategoriaAutos":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/categoryCar"}
                          title="Categoria Autos"
                          icon={<IoCarSportOutline size={"20px"} />}
                          href="/categoryCar"
                        />
                      );
                    case "Viajes":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/journey"}
                          title="Solicitud Mi viaje perfecto"
                          icon={<IoAirplaneOutline size={"20px"} />}
                          href="/journey"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}

            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "Habitaciones":
                case "Reserva Seadust":
                  return true; // Si alguno de estos casos es válido, renderiza el SidebarMenu
                default:
                  return false;
              }
            }) && (
              <SidebarMenu title="Semanas Infinity">
                {permissions.map((permission) => {
                  switch (permission.modules.name) {
                    case "Habitaciones":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/rooms"}
                          title="Habitaciones"
                          icon={<IoSparklesOutline size={"20px"} />}
                          href="/rooms"
                        />
                      );
                    case "Reserva Seadust":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/reservation"}
                          title="Solicitud Semanas Infinity"
                          icon={<IoBusinessOutline size={"20px"} />}
                          href="/reservation"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}
            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "Categorias":
                case "Destinos":
                case "Vehiculos":
                case "Traslados":
                  return true; // Si alguno de estos casos es válido, renderiza el SidebarMenu
                default:
                  return false;
              }
            }) && (
              <SidebarMenu title="Traslados">
                {permissions.map((permission) => {
                  switch (permission.modules.name) {
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
                    case "Traslados":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/transfers"}
                          title="Solicitud Traslados"
                          icon={<IoSwapHorizontalOutline size={"20px"} />}
                          href="/transfers"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}

            {permissions.some((permission) => {
              switch (permission.modules.name) {
                case "PaquetesYates":
                case "Experiencia":
                case "MotorYates":
                case "SolicitudYates":
                  return true; 
                default:
                  return false;
              }
            }) && (
              <SidebarMenu title="Yates">
                {permissions.map((permission) => {
                  switch (permission.modules.name) {
                    case "PaquetesYates":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/packageyachts"}
                          title="Paquetes Yates"
                          icon={<IoFileTrayStackedOutline size={"20px"} />}
                          href="/packageyachts"
                        />
                      );
                    case "Experiencia":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/typeOfExperience"}
                          title="Tipo Experiencia"
                          icon={<IoTicketOutline size={"20px"} />}
                          href="/typeOfExperience"
                        />
                      );
                    case "MotorYates":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/yachtEngine"}
                          title="Motor Yates"
                          icon={<IoLayersOutline size={"20px"} />}
                          href="/yachtEngine"
                        />
                      );
                    case "SolicitudYates":
                      return (
                        <SidebarItem
                          key={permission.modules.name}
                          isActive={pathname === "/yachtrequest"}
                          title="Solicitud Yates"
                          icon={<IoBoatOutline size={"20px"} />}
                          href="/yachtrequest"
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </SidebarMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

// case "DestinosYates":
//   return (
//     <SidebarItem
//       key={permission.modules.name}
//       isActive={pathname === "/destinationship"}
//       title="Origen/Destinos Yates"
//       icon={<IoBoatOutline size={"20px"} />}
//       href="/destinationship"
//     />
//   );
