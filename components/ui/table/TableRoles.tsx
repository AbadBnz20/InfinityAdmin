'use client';

import { Role } from "@/interfaces/roles-interfaces";
import { useModalStore } from "@/store/ModalStore";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useCallback } from "react";
import { EditIcon } from "../icons/edit-icon";
import { DeleteRole } from "@/actions/roles.action";
import { ModalConfirm } from "../modal/ModalConfirm";

export const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Estado", uid: "state" },
    { name: "Acciones", uid: "actions" },
  ];

  interface TableProps {
    items: Role[];
  }
export const TableRoles = ({items}:TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();

    
    const renderCell = useCallback((item: Role, columnKey: React.Key) => {
        switch (columnKey) {
          case "name":
            return (
              <div>
                <span>{item.name}</span>
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
                <Tooltip content="Editar" color="primary">
                  <button
                    onClick={() => {
                      onChanseItem(item.roleId);
                      onOpen();
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
                <ModalConfirm idItem={item.roleId} Ondelete={DeleteRole} />
              </div>
            );
          default:
            return 
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
          <TableRow key={item.roleId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
  )
}
