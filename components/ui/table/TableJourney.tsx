"use client";

import { Journey } from "@/interfaces/journey-interfaces";
import { getLocalTimeZone } from "@internationalized/date";
import {
  DatePicker,
  DateValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { DownloadJourney } from "../contentButton/DownloadJourney";

export const columns = [
  { name: "Nombre", uid: "user" },
  { name: "Email", uid: "email" },
  { name: "Celular", uid: "phone" },
  { name: "Pais de origen", uid: "country_origin" },
  { name: "Ciudad de origen", uid: "city_origin" },
  { name: "Pais de destino", uid: "contry_destination" },
  { name: "Ciudad de destino", uid: "city_destination" },
  { name: "Fecha de ida", uid: "departure_date" },
  { name: "Fecha de retorno", uid: "return_date" },
  { name: "Presupuesto(USD)", uid: "budget" },
  { name: "Pasajeros", uid: "passengers" },
];

interface TableProps {
  items: Journey[];
  update: boolean;
  deletecell: boolean;
}

export const TableJourney = ({ items: rows }: TableProps) => {
  const renderCell = useCallback((item: Journey, columnKey: React.Key) => {
    switch (columnKey) {
      case "user":
        return (
          <div>
            <span>{item.user}</span>
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
      case "country_origin":
        return (
          <div>
            <span>{item.country_origin}</span>
          </div>
        );
      case "city_origin":
        return (
          <div>
            <span>{item.city_origin}</span>
          </div>
        );
      case "contry_destination":
        return (
          <div>
            <span>{item.contry_destination}</span>
          </div>
        );
      case "city_destination":
        return (
          <div>
            <span>{item.city_destination}</span>
          </div>
        );

      case "departure_date":
        return (
          <div>
            <span>{item.departure_date}</span>
          </div>
        );
      case "return_date":
        return (
          <div>
            <span>{item.return_date}</span>
          </div>
        );
      case "budget":
        return (
          <div>
            <span>{item.budget}</span>
          </div>
        );
      case "passengers":
        return (
          <div>
            <span>
              Adultos:{item.adult}, Niños: {item.childrens.join(", ")}
            </span>
          </div>
        );
      default:
        return;
    }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  // const pages = Math.ceil(rows.length / rowsPerPage);
  const [startDate, setStartDate] = useState<DateValue | null>(null);
  const [endDate, setEndDate] = useState<DateValue | null>(null);
  const filteredRows = useMemo(() => {
    if (!startDate && !endDate) return rows;

    return rows.filter((row) => {
      const rowDate = new Date(row.createDate);
      const from = startDate
        ? new Date(startDate.toDate(getLocalTimeZone()))
        : null;
      const to = endDate ? new Date(endDate.toDate(getLocalTimeZone())) : null;

      if (from && to) {
        return rowDate >= from && rowDate <= to;
      } else if (from) {
        return rowDate >= from;
      } else if (to) {
        return rowDate <= to;
      }
      return true;
    });
  }, [rows, startDate, endDate]);

  const pages = Math.ceil(filteredRows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [page, rowsPerPage, filteredRows]);

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
          <div className="flex gap-2 flex-col items-start">
            <div className="grid grid-cols-2 gap-2">
              <DatePicker
                labelPlacement={"outside"}
                label="Desde"
                size="sm"
                value={startDate ?? undefined}
                onChange={(e) => {
                  setStartDate(e);
                  setPage(1);
                }}
              />
              <DatePicker
                labelPlacement={"outside"}
                label="Hasta"
                size="sm"
                value={endDate ?? undefined}
                onChange={(e) => {
                  setEndDate(e);
                  setPage(1);
                }}
              />
            </div>
            <span className="text-default-400 text-small">
              Total {rows.length} items
            </span>
          </div>
          <div className="flex gap-2 flex-col items-end">
            <DownloadJourney data={rows} />
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
            <TableRow key={item.quotesId}>
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
