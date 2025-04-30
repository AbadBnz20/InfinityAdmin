"use client";

import { Transfer } from "@/interfaces/transfer-interfaces";
import { getLocalTimeZone } from "@internationalized/date";
import { DatePicker, DateValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { DownloadTransfer } from "../contentButton/DownloadTransfer";


export const columns = [
    { name: "Código de Transferencia", uid: "transfer_code" },
    { name: "Nombre", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "Teléfono", uid: "phone" },
    { name: "Tipo", uid: "type" },
    { name: "Fecha de Llegada", uid: "arrival_date" },
    { name: "Hora de Llegada", uid: "arrival_time" },
    { name: "Fecha de Retorno", uid: "return_date" },
    { name: "Hora de Retorno", uid: "return_time" },
    { name: "Adultos", uid: "passengers.aduts" },
    { name: "Niños", uid: "passengers.children" },
    { name: "Transporte Ida", uid: "arrival_car.model" },
    { name: "Transporte Retorno", uid: "return_car.model" },
    { name: "Origen", uid: "origin.name" },
    { name: "Destino", uid: "destination.name" },
    { name: "Descripción", uid: "description" },
  ];

interface TableProps {
  items: Transfer[];
}


export const TableTransfer = ({ items: rows }: TableProps) => {
    const renderCell = useCallback(
        (item: Transfer, columnKey: React.Key) => {
          switch (columnKey) {
            case "transfer_code":
              return <span>{item.transfer_code ?? "—"}</span>;
      
            case "name":
              return <span>{item.name}</span>;
      
            case "email":
              return <span>{item.email}</span>;
      
            case "phone":
              return <span>{item.phone}</span>;
      
            case "type":
              return <span>{item.type}</span>;
      
            case "arrival_date":
              return <span>{item.arrival_date}</span>;
      
            case "arrival_time":
              return <span>{item.arrival_time}</span>;
      
            case "return_date":
              return <span>{item.return_date}</span>;
      
            case "return_time":
              return <span>{item.return_time}</span>;
      
            case "passengers.aduts":
              return <span>{item.passengers?.aduts ?? 0}</span>;
      
            case "passengers.children":
              return <span>{item.passengers?.children ?? 0}</span>;
      
            case "arrival_car.model":
              return <span>{item.arrival_car?.model ?? "—"}</span>;
      
            case "return_car.model":
              return <span>{item.return_car?.model ?? "—"}</span>;
      
            case "origin.name":
              return <span>{item.origin.name ?? "—"}</span>;
      
            case "destination.name":
              return <span>{item.destination?.name ?? "—"}</span>;
      
            case "description":
              return <span>{item.description ?? "—"}</span>;
      
            default:
              return null;
          }
        },
        []
      );

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
                <DownloadTransfer data={rows} />
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
          <TableRow key={item.transferId}>
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
