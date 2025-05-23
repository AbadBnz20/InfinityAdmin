"use client";
import { Car } from "@/interfaces/car-interfaces";
import { useModalStore } from "@/store/ModalStore";
import {
  Chip,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../icons/edit-icon";
import { DeleteCar } from "@/actions/car.actions";
import { ModalConfirm } from "../modal/ModalConfirm";

export const columns = [
  { name: "Imagen", uid: "image" },
  { name: "Tipo", uid: "type" },
  { name: "Marca", uid: "brand" },
  { name: "Modelo", uid: "model" },
  { name: "Placa", uid: "plate" },
  { name: "Capacidad", uid: "ability" },
  { name: "Color", uid: "color" },
  { name: "Descripcion", uid: "description" },
  { name: "Precio por traslado", uid: "transferprice" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];

interface TableProps {
  items: Car[];
  update: boolean;
  deletecell: boolean;
}

export const TableCar = ({ items: rows,update,deletecell }: TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();
  const renderCell = useCallback((item: Car, columnKey: React.Key) => {
    switch (columnKey) {
      case "image":
        return (
          <div>
            <Image alt="NextUI hero Image" src={item.image} width={150} />
          </div>
        );
      case "type":
        return (
          <div>
            <span>{item.type}</span>
          </div>
        );
        case "brand":
          return (
            <div>
              <span>{item.brand}</span>
            </div>
          );
      case "model":
        return (
          <div>
            <span>{item.model}</span>
          </div>
        );
      case "plate":
        return (
          <div>
            <span>{item.plate}</span>
          </div>
        );
      case "ability":
        return (
          <div>
            <span>{item.ability}</span>
          </div>
        );
        case "color":
          return (
            <div>
              <span>{item.color}</span>
            </div>
          );
  
      case "description":
        return (
          <div>
            <span>{item.description}</span>
          </div>
        );
      case "transferprice":
        return (
          <div>
            <span>{item.transferprice}</span>
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
             <div>
              {update && (
                <Tooltip content="Editar" color="primary">
                  <button
                    onClick={() => {
                      onChanseItem(item.carId);
                      onOpen();
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              )}
            </div>
            {
              deletecell && <ModalConfirm idItem={item.carId} Ondelete={DeleteCar} />
            }
            
          </div>
        );
      default:
        return;
    }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  const onRowsPerPageChange = useCallback(
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
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.carId}>
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
