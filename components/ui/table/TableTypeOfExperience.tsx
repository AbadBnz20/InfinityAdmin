'use client';

import { TypeOfExperience } from "@/interfaces/typeofexperience";
import { useModalStore } from "@/store/ModalStore";
import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../icons/edit-icon";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteTypeOfExperience } from "@/actions/typeofexperience";


export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];
interface TableProps {
  items: TypeOfExperience[];
  update: boolean;
  deletecell: boolean;
}
export const TableTypeOfExperience = ({items:rows,update,deletecell}:TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();

    const renderCell = useCallback((item: TypeOfExperience, columnKey: React.Key) => {
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
              {update && (
                <Tooltip content="Editar" color="primary">
                  <button
                    onClick={() => {
                      onChanseItem(item.typeOfExperienceId);
                      onOpen();
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              )}
              {deletecell && (
                <ModalConfirm
                  idItem={item.typeOfExperienceId}
                  Ondelete={DeleteTypeOfExperience}
                />
              )}
            </div>
          );
        default:
          return;
      }
    }, []);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(rows.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return rows.slice(start, end);
    }, [page, rows, rowsPerPage]);
  
    const onRowsPerPageChange = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      },
      []
    );
  
    const topContent = useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {rows.length} items
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [onRowsPerPageChange]);
  
    const bottomContent = useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-center items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      );
    }, [items.length, page, pages]);
  
    return (
      <div className=" w-full flex flex-col gap-4">
        <Table
          topContent={topContent}
          bottomContent={bottomContent}
          aria-label="Example table with custom cells"
        >
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
          <TableBody emptyContent={"No hay items para mostrar"} items={items}>
            {(item) => (
              <TableRow key={item.typeOfExperienceId}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
}
