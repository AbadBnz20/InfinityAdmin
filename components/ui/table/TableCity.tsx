"use client";

import { City } from "@/interfaces/city-interfaces";
import { useModalStore } from "@/store/ModalStore";
import {
  Chip,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditIcon } from "../icons/edit-icon";
import { DeleteCity, ListCityForPage } from "@/actions/ctity.action";
import { ModalConfirm } from "../modal/ModalConfirm";
import { IoSearchOutline } from "react-icons/io5";

export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Estado", uid: "state.name" },
  { name: "Estado", uid: "status" },
  { name: "Acciones", uid: "actions" },
];

interface TableProps {
  update: boolean;
  deletecell: boolean;
}
export const TableCity = ({ update, deletecell }: TableProps) => {
  const { onChanseItem, onOpen } = useModalStore();
  const [rows, setrows] = useState<City[]>([]);
  const [totalpages, setTotalpages] = useState(0);
  const [loading, setLoading] = useState(false);

  const renderCell = useCallback((item: City, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div>
            <span>{item.name}</span>
          </div>
        );
      case "state.name":
        return (
          <div>
            <span>{item.state.name}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={item.status ? "success" : "danger"}
          >
            <span className="capitalize text-xs">
              {item.status ? "Activo" : "Inactivo"}
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
                    onChanseItem(item.cityId);
                    onOpen();
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            )}
            {deletecell && (
              <ModalConfirm idItem={item.cityId} Ondelete={DeleteCity} />
            )}
          </div>
        );
      default:
        return;
      // <span>{item[columnKey as keyof State]?.toString() || ""}</span>;
    }
  }, []);

  useEffect(() => {
    GetCities();
  }, []);

  const GetCities = async () => {
    setLoading(true);
    const cities = await ListCityForPage(0, 4);
    setrows(cities.city);
    setTotalpages(cities.count || 0);
    setLoading(false);
  };

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");
  const pages = Math.ceil(totalpages / rowsPerPage);
  const loadingState = loading || totalpages === 0 ? "loading" : "idle";

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      OnChansePages(1, search);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, rowsPerPage]);

  useEffect(() => {
    OnChansePages(page,search);
  }, [page, rowsPerPage, search]);
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const OnChansePages = async (page: number, searchTerm: string = "") => {
    setLoading(true);
    setPage(page);
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage - 1;
    const cities = await ListCityForPage(start, end, searchTerm);
    setrows(cities.city);
    setTotalpages(cities.count || 0);
    setLoading(false);
  };

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
          onChange={OnChansePages}
        />
      </div>
    );
  }, [page, pages]);

  const onSearchChange = (value?: string) => {
    if (value) {
      setsearch(value);
      setPage(1);
    } else {
      setsearch("");
    }
  };
  const onClear = useCallback(() => {
    setsearch("");
    setPage(1);
  }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Input
        isClearable
        className="w-full sm:max-w-[40%]"
        placeholder="Buscar..."
        startContent={<IoSearchOutline size={"20px"} />}
        value={search}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
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
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
          items={rows}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.cityId}>
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
