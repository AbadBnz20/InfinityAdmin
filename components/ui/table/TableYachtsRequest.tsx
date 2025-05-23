"use client";

import { YachsRequest } from "@/interfaces/YachtsRequest";
import {
  Chip,
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
import { useCallback, useMemo, useState } from "react";
import { PdfDownloadYach } from "../contentButton/PdfDownloadYach";
import { getLocalTimeZone } from "@internationalized/date";

export const columns = [
  { name: "Fecha", uid: "date" },
  { name: "Tiempo", uid: "time" },
  { name: "Pasajeros", uid: "passengers" },
  { name: "Nombre", uid: "firstName" },
  { name: "Apellido", uid: "lastName" },
  { name: "Email", uid: "email" },
  { name: "Celular", uid: "phone" },
  { name: "Paquete", uid: "packageYachtId" },
  { name: "Experiencia", uid: "typeOfExperience.name" },
  { name: "Motor", uid: "motorYacht.name" },
  { name: "Estado", uid: "state" },
];

interface TableProps {
  items: YachsRequest[];
  update: boolean;
  deletecell: boolean;
}
export const TableYachtsRequest = ({ items: rows }: TableProps) => {
  const renderCell = useCallback((item: YachsRequest, columnKey: React.Key) => {
    switch (columnKey) {
      case "date":
        return (
          <div>
            <span>{item.date}</span>
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
      case "firstName":
        return (
          <div>
            <span>{item.firstName}</span>
          </div>
        );
      case "lastName":
        return (
          <div>
            <span>{item.lastName}</span>
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
      case "packageYachtId":
        return (
          <div>
            <span>{item.packageYachtId ? "Si" : "No"}</span>
          </div>
        );
      case "typeOfExperience.name":
        return (
          <div>
            <span>{item.typeOfExperience.name}</span>
          </div>
        );

      case "motorYacht.name":
        return (
          <div>
            <span>{item.motorYacht.name}</span>
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
    }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  // const pages = Math.ceil(rows.length / rowsPerPage);
  const [startDate, setStartDate] = useState<DateValue | null>(null);
  const [endDate, setEndDate] = useState<DateValue | null>(null);

  // const [value, setValue] = useState<RangeValue<DateValue> | null>(null);

  // const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));

  // const items = useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return rows.slice(start, end);
  // }, [page, rows, rowsPerPage]);

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
            <PdfDownloadYach data={rows} />
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
            <TableRow key={item.yachtRequestId}>
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
