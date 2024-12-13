"use client";
import { Packages } from "@/interfaces/package-interfaces";
import { useModalStore } from "@/store/ModalStore";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { useCallback } from "react";
import { EditIcon } from "../icons/edit-icon";
import { DeletePackage } from "@/actions/package.action";
import { ModalConfirm } from "../modal/ModalConfirm";

export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Descripcion", uid: "description" },
  { name: "Porcentaje", uid: "percentage" },
  { name: "Precio", uid: "price" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];
interface TableProps {
    items: Packages[];
  }
  
export const TablePackage = ({ items }: TableProps) => {
  const { onChanseItem, onOpen } = useModalStore();
  const renderCell = useCallback((item: Packages, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Packages];

    switch (columnKey) {
      case "name":
        return (
          <div>
            <div>
              <span>{cellValue}</span>
            </div>
          </div>
        );
        case "description":
        return (
          <div>
            <div>
              <span>{cellValue}</span>
            </div>
          </div>
        );
        case "percentage":
        return (
          <div>
            <div>
              <span>{cellValue}%</span>
            </div>
          </div>
        );
        case "price":
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
                    onChanseItem(item.packageId);
                    onOpen();
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            </div>
            <ModalConfirm idItem={item.packageId} Ondelete={DeletePackage} />
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
          <TableRow key={item.packageId}>
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
