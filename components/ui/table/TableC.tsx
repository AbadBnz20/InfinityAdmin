"use client";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { EditIcon } from "../icons/edit-icon";
import { Countries } from "@/interfaces/countries-interfaces";
import { useModalStore } from "@/store/ModalStore";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteCountry } from "@/actions/countries.action";
export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];

interface TableProps {
  items: Countries[];
}

export const TableC = ({ items }: TableProps) => {
  const { onChanseItem, onOpen } = useModalStore();

  const renderCell = useCallback((user: Countries, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Countries];

    switch (columnKey) {
      case "name":
        return (
          <div>
            <div>
              <span>{cellValue}</span>
            </div>
          </div>
        );
      case "state":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={cellValue ? "success" : "danger"}
          >
            <span className="capitalize text-xs">
              {cellValue ? "Activo" : "Inactivo"}
            </span>
          </Chip>
        );

      case "actions":
        return (
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Editar" color="primary">
                <button
                  onClick={() => {
                    onChanseItem(user.countryId);
                    onOpen();
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            </div>
            <ModalConfirm idItem={user.countryId} Ondelete={DeleteCountry} />
          </div>
        );
      default:
        return cellValue;
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
            <TableRow key={item.countryId}>
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
