'use client';

import { packageyachts } from "@/interfaces/packageyachts";
import { useModalStore } from "@/store/ModalStore";
import { Chip, Image, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../icons/edit-icon";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteYachsPackage } from "@/actions/packageyachts";


export const columns = [
    { name: "Imagen", uid: "image" },
    { name: "Nombre", uid: "name" },
    { name: "Tiempo", uid: "time" },
    { name: "Pasajeros", uid: "passengers" },
    { name: "Precio", uid: "price" },
    { name: "Puntos", uid: "points" },
    { name: "Ubicacion", uid: "origin_destination_ship.name" },
    { name: "Estado", uid: "state" },
    { name: "Acciones", uid: "actions" },
  ];

  interface TableProps {
    items: packageyachts[];
    update: boolean;
    deletecell: boolean;
  }
  


export const TablePackageYachts = ({ items: rows,update,deletecell }: TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();
    const renderCell = useCallback((item: packageyachts, columnKey: React.Key) => {
      switch (columnKey) {
        case "image":
          return (
            <div>
              <Image alt="NextUI hero Image" src={item.image} width={150} />
            </div>
          );
        case "name":
          return (
            <div>
              <span>{item.name}</span>
            </div>
          );
          case "time":
            return (
              <div>
                <span>{item.time}</span>
              </div>
            );
        case "passengers":
          return (
            <div>
              <span>{item.passengers}</span>
            </div>
          );
        case "price":
          return (
            <div>
              <span>{item.price}</span>
            </div>
          );
        case "points":
          return (
            <div>
              <span>{item.points}</span>
            </div>
          );     
        case "origin_destination_ship.name":
          return (
            <div>
              <span>{item.origin_destination_ship.name}</span>
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
                        onChanseItem(item.yachtPackageId);
                        onOpen();
                      }}
                    >
                      <EditIcon size={20} fill="#979797" />
                    </button>
                  </Tooltip>
                )}
              </div>
              {
                deletecell && <ModalConfirm idItem={item.yachtPackageId} Ondelete={DeleteYachsPackage} />
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
            <TableRow key={item.yachtPackageId}>
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
