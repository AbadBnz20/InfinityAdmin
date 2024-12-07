'use client';

import { State } from "@/interfaces/state-interfaces";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useCallback } from "react";
import { EditIcon } from "../icons/edit-icon";
import { useModalStore } from "@/store/ModalStore";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteState } from "@/actions/state.action";



export const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Pais", uid: "country.name" },
    { name: "Estado", uid: "state" },
    { name: "Acciones", uid: "actions" },
  ];

  interface TableProps {
    items: State[];
  }
export const TableState = ({ items }: TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();

    const renderCell = useCallback((item: State, columnKey: React.Key) => {
        switch (columnKey) {
          case "name":
            return (
              <div>
                <span>{item.name}</span>
              </div>
            );
          case "country.name":
            return (
              <div>
                <span>{item.country.name}</span>
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
                      onChanseItem(item.stateId);
                      onOpen();
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
                <ModalConfirm idItem={item.stateId} Ondelete={DeleteState} />
              </div>
            );
          default:
            return 
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
          <TableRow key={item.stateId}>
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
