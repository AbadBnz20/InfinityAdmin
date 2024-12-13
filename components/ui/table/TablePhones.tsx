"use client";
import { Phone } from "@/interfaces/phones-interfaces";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback } from "react";

export const columns = [
  { name: "Tipo", uid: "type" },
  { name: "Codigo", uid: "code" },
  { name: "Numero", uid: "number" },
  { name: "Nota", uid: "note" },
  { name: "Nombre", uid: "profile.firstname" },
  { name: "Apellido", uid: "profile.lastname" },
  { name: "Estado", uid: "state" },
];
interface TableProps {
  items: Phone[];
}
export const TablePhones = ({ items }: TableProps) => {
  const renderCell = useCallback((item: Phone, columnKey: React.Key) => {
    switch (columnKey) {
      case "profile.firstname":
        return (
          <div>
            <span>{item.profile.firstname}</span>
          </div>
        );
      case "profile.lastname":
        return (
          <div>
            <span>{item.profile.lastname}</span>
          </div>
        );
      case "type":
        return (
          <div>
            <span>{item.type}</span>
          </div>
        );
      case "code":
        return (
          <div>
            <span>{item.code}</span>
          </div>
        );
      case "number":
        return (
          <div>
            <span>{item.number}</span>
          </div>
        );
      case "note":
        return (
          <div>
            <span>{item.note}</span>
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
      default:
        return;
      // <span>{item[columnKey as keyof State]?.toString() || ""}</span>;
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
            <TableRow key={item.phoneId}>
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
