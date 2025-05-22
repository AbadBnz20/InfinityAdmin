"use client";

import { State } from "@/interfaces/state-interfaces";
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
  Tooltip,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { EditIcon } from "../icons/edit-icon";
import { useModalStore } from "@/store/ModalStore";
import { ModalConfirm } from "../modal/ModalConfirm";
import { DeleteState } from "@/actions/state.action";
import { IoSearchOutline } from "react-icons/io5";

export const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Pais", uid: "country.name" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
];

interface TableProps {
  items: State[];
  update: boolean;
  deletecell: boolean;
}
export const TableState = ({ items: rows, update, deletecell }: TableProps) => {
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
            {update && (
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
            )}
            {deletecell && (
              <ModalConfirm idItem={item.stateId} Ondelete={DeleteState} />
            )}
          </div>
        );
      default:
        return;
      // <span>{item[columnKey as keyof State]?.toString() || ""}</span>;
    }
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");
  const pages = Math.ceil(rows.length / rowsPerPage);


const filteredRows = useMemo(() => {
    if (!search.trim()) {
      return rows; 
    }
  
    return rows.filter((item) => {
      const searchValue = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchValue) 
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
            <TableRow key={item.stateId}>
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
