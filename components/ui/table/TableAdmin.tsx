"use client";

import { Admin } from "@/interfaces/admin-interfaces";
import {
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteAdmin } from "@/actions/admin.action";
import { IoSearchOutline } from "react-icons/io5";

export const columns = [
  { name: "Nombre", uid: "firstName" },
  { name: "Dirección", uid: "address" },
  { name: "Email", uid: "email" },
  { name: "Teléfono", uid: "phone" },
  { name: "País", uid: "country.name" },
  { name: "Rol", uid: "role.name" },
  { name: "Ubicación", uid: "location.name" },
  { name: "Posición", uid: "position.name" },
  { name: "Departamento", uid: "department.name" },
  { name: "Estado", uid: "state.name" },
  { name: "Estado", uid: "status" },
    { name: "Acciones", uid: "actions" },
];

interface TableProps {
  items: Admin[];
  update: boolean;
  deleteRom: boolean;
}
export const TableAdmin = ({ items: rows, deleteRom }: TableProps) => {
  //   const { onChanseItem, onOpen } = useModalStore();
  const renderCell = useCallback((item: Admin, columnKey: React.Key) => {
    switch (columnKey) {
      case "firstName":
        return (
          <div>
            <span>
              {item.firstName} {item.lastName}
            </span>
          </div>
        );
      case "address":
        return (
          <div>
            <span>{item.address}</span>
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
      case "country.name":
        return (
          <div>
            <span>{item.country.name}</span>
          </div>
        );
      case "role.name":
        return (
          <div>
            <span>{item.role.name}</span>
          </div>
        );
      case "location.name":
        return (
          <div>
            <span>{item.location.name}</span>
          </div>
        );
      case "position.name":
        return (
          <div>
            <span>{item.position.name}</span>
          </div>
        );
      case "department.name":
        return (
          <div>
            <span>{item.department.name}</span>
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
            {/* {update && (
              <Tooltip content="Editar" color="primary">
                <button
                  onClick={() => {
                    onChanseItem(item.profileId);
                    onOpen();
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            )} */}

            {deleteRom && (
              <ModalConfirm idItem={item.IdAdmin} Ondelete={DeleteAdmin} />
            )}
          </div>
        );
      default:
        return;
    }
  }, []);




  const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setsearch] = useState("");
  const [page, setPage] = useState(1);
  const pages = Math.ceil(rows.length / rowsPerPage);


  const filteredRows = useMemo(() => {
    if (!search.trim()) {
      return rows; 
    }
  
    return rows.filter((item) => {
      const searchValue = search.toLowerCase();
      return (
        item.firstName.toLowerCase().includes(searchValue) ||
        item.lastName.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.phone.toLowerCase().includes(searchValue)
      );
    });
  }, [rows, search]);


  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredRows.slice(start, end);
  }, [page, rows, rowsPerPage,filteredRows]);

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
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.IdAdmin}>
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
