"use client";

import { Points } from "@/interfaces/point-interfaces";
import {

  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";

export const columns = [
  { name: "Nombre", uid: "firstname" },
  { name: "Apellido", uid: "lastname" },
  { name: "Email", uid: "email" },
  { name: "Celular", uid: "phone" },
];
interface TableProps {
  items: Points[];
}
export const TablePhones = ({ items: rows }: TableProps) => {
  const renderCell = useCallback((item: Points, columnKey: React.Key) => {
    switch (columnKey) {
      case "firstname":
        return (
          <div>
            <span>{item.firstname}</span>
          </div>
        );
      case "lastname":
        return (
          <div>
            <span>{item.lastname}</span>
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
