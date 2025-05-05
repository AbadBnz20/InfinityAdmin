"use client";

import { User as Profile } from "@/interfaces/users-interfaces";
import { useModalStore } from "@/store/ModalStore";
import {
  Avatar,
  Button,
  Chip,
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
import { IoSendOutline } from "react-icons/io5";
import { DeleteUser, UpdateSendEmail } from "@/actions/user.action";
import { toast } from "react-toastify";
import { ModalConfirm } from "../modal/ModalConfirm";

export const columns = [
  { name: "Imagen", uid: "photo" },
  { name: "Nro. Contrato", uid: "NroContract" },
  { name: "Nombre", uid: "firstname" },
  { name: "Email", uid: "email" },
  { name: "Celular", uid: "phone" },
  // { name: "Dirección", uid: "address" },

  { name: "Fecha nacimiento", uid: "birthdate" },
  { name: "Descuento", uid: "discount" },
  { name: "Fecha de Venta", uid: "DateSold" },
  { name: "Fecha de Expiración", uid: "Expiration" },
  { name: "Email Secundario", uid: "SecondaryEmail" },
  { name: "Estado de Billetera", uid: "StatusWallet" },

  { name: "Nota", uid: "Note" },
  { name: "Estado/Provincia", uid: "state.name" },
  { name: "Locación", uid: "location.name" },

  { name: "Paquete", uid: "package.name" },
  { name: "Lenguaje", uid: "language.name" },
  { name: "Estado", uid: "state" },
  { name: "Acciones", uid: "actions" },
  { name: "Enviar Email", uid: "SendEmail" },
];

interface TableProps {
  items: Profile[];
  update: boolean;
}
export const TableUser = ({ items: rows, update }: TableProps) => {
  const { onChanseItem, onOpen } = useModalStore();
  const [loading, setloading] = useState(false);
  const OnSendEmail = async (id: string, email: string, fullname: string, language:string) => {
    setloading(true);

    const languageemail =
    language === "3fbff8d6-c2e2-476d-99f4-ebf47b2797cd"
      ? "en"
      : "es";

    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullname,
        email: email,
        language: languageemail,
      }),
    });
    const datafetch = await res.json();
    console.log(datafetch);

    const resp = await UpdateSendEmail(id);
    if (!resp.status) {
      return toast.error(resp.message, {
        position: "top-right",
      });
    }

    toast.success(resp.message, {
      position: "top-right",
    });
    setloading(false);
  };

  const renderCell = useCallback((item: Profile, columnKey: React.Key) => {
    switch (columnKey) {
      case "photo":
        return <Avatar isBordered size="lg" src={item.photo} />;
      case "firstname":
        return (
          <div>
            <span>
              {item.firstname} {item.lastname}
            </span>
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
      // case "address":
      //   return (
      //     <div>
      //       <span>{item.address}</span>
      //     </div>
      //   );
      case "birthdate":
        return (
          <div>
            <span>{item.birthdate}</span>
          </div>
        );
      case "discount":
        return (
          <div>
            <span>{item.discount}</span>
          </div>
        );
      case "NroContract":
        return (
          <div>
            <span>{item.NroContract}</span>
          </div>
        );
      case "DateSold":
        return (
          <div>
            <span>{item.DateSold}</span>
          </div>
        );
      case "Expiration":
        return (
          <div>
            <span>{item.Expiration}</span>
          </div>
        );
      case "SecondaryEmail":
        return (
          <div>
            <span>{item.SecondaryEmail}</span>
          </div>
        );
      case "StatusWallet":
        return (
          <div>
            <span>{item.StatusWallet}</span>
          </div>
        );
      case "Note":
        return (
          <div>
            <span>{item.Note}</span>
          </div>
        );
      case "location.name":
        return (
          <div>
            <span>{item.location.name}</span>
          </div>
        );

      case "state.name":
        return (
          <div>
            <span>{item.state.name}</span>
          </div>
        );
      case "package.name":
        return (
          <div>
            <span>{item.package.name}</span>
          </div>
        );
      case "language.name":
        return (
          <div>
            <span>{item.language.name}</span>
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
                    onChanseItem(item.profileId);
                    onOpen();
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            )}

            <ModalConfirm idItem={item.profileId} Ondelete={DeleteUser} />
          </div>
        );
      case "SendEmail":
        return (
          <div className="flex items-center gap-4">
            <Button
              onPress={() =>
                OnSendEmail(
                  item.profileId,
                  item.email,
                  `${item.firstname} ${item.lastname}`,
                  item.languageId
                )
              }
              isLoading={loading}
              isDisabled={item.SendEmail === 3}
              color="primary"
              variant="light"
              size="sm"
            >
              ( {item.SendEmail}/3) 
              <IoSendOutline />
            </Button>
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
