"use client";

import { User as Profile } from "@/interfaces/users-interfaces";
import {
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,

} from "@nextui-org/react";
import { useCallback } from "react";

export const columns = [
  { name: "Imagen", uid: "photo" },
  { name: "Nombre", uid: "firstname" },
  { name: "Email", uid: "email" },
  { name: "Celular", uid: "phone" },
  { name: "Dirección", uid: "address" },
  { name: "Estado/Provincia", uid: "state.name" },
  { name: "Paquete", uid: "package.name" },
  { name: "Lenguaje", uid: "language.name" },
  { name: "Rol", uid: "role.name" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];

interface TableProps {
  items: Profile[];
}
export const TableUser = ({ items }: TableProps) => {
  const renderCell = useCallback((item: Profile, columnKey: React.Key) => {
    switch (columnKey) {
      case "photo":
        return <Avatar isBordered size="lg" src={item.photo} />;
      case "firstname":
        return (
          <div>
            <span>{item.firstname} {item.lastname}</span>
          </div>
        );
      case "email":
        return (
          <div>
            <span>{item.email}</span>
          </div>
        );
      case "phone":
        return (
          <div>
            <span>{item.phone}</span>
          </div>
        );
      case "address":
        return (
          <div>
            <span>{item.address}</span>
          </div>
        );
      case "state.name":
        return (
          <div>
            <span>{item.state.name}</span>
          </div>
        );
      case "package.name":
        return (
          <div>
            <span>{item.package.name}</span>
          </div>
        );
      case "language.name":
        return (
          <div>
            <span>{item.language.name}</span>
          </div>
        );
      case "role.name":
        return (
          <div>
            <span>{item.role.name}</span>
          </div>
        );
      case "state":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={item.state ? "success" : "danger"}
          >
            <span className="capitalize text-xs">
              {item.state ? "Activo" : "Inactivo"}
            </span>
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-4">
            {/* <ModalConfirm idItem={item.stateId} Ondelete={DeleteState} /> */}
          </div>
        );
      default:
        return;
    }
  }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.profileId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
