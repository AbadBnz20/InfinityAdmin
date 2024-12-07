'use client';
import { Languages } from '@/interfaces/languages-interfaces';
import { useModalStore } from '@/store/ModalStore';
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import React, { useCallback } from 'react'
import { EditIcon } from '../icons/edit-icon';
import { DeleteLanguage } from '@/actions/languages.actions';
import { ModalConfirm } from '../modal/ModalConfirm';

export const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Estado", uid: "state" },
    { name: "Acciones", uid: "actions" },
  ];
  interface TableProps {
    items: Languages[];
  }
export const TableLanguages = ({items}:TableProps) => {
    const { onChanseItem, onOpen } = useModalStore();


    const renderCell = useCallback((item: Languages, columnKey: React.Key) => {
        switch (columnKey) {
          case "name":
            return (
              <div>
                <span>{item.name}</span>
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
                <Tooltip content="Editar" color="primary">
                  <button
                    onClick={() => {
                      onChanseItem(item.languageId);
                      onOpen();
                    }}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
                <ModalConfirm idItem={item.languageId} Ondelete={DeleteLanguage} />
              </div>
            );
          default:
            return 
        }
      }, []);

  return (
    <div className=" w-full flex flex-col gap-4">
    <Table aria-label="Example table with custom cells">
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
          <TableRow key={item.languageId}>
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
