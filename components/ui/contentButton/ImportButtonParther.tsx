import { ImportUserByExcel, UserByExcel } from "@/actions/user.action";
import { Button, useDisclosure } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ModalInformation } from "../modal/ModalInformation";

export const ImportButtonParther = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [record, setrecord] = useState<
    {
      status: boolean;
      message: string;
    }[]
  >([]);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const file = e.target.files?.[0];
    if (!file) return;
    setrecord([]);
    onOpen();
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, {
        type: "array",
        cellDates: true,
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet["!ref"]!);

      const allRows: string[][] = [];
      const users: UserByExcel[] = [];

      for (let row = range.s.r; row <= range.e.r; row++) {
        const currentRow: string[] = [];

        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = sheet[cellAddress];
          if (!cell) {
            currentRow.push("");
          } else if (cell.t === "d") {
            const date = new Date(cell.v);
            const formatted = date.toISOString().split("T")[0];
            currentRow.push(formatted);
          } else if (
            cell.t === "n" &&
            cell.z &&
            cell.z.toLowerCase().includes("d")
          ) {
            const dateObj = XLSX.SSF.parse_date_code(cell.v);
            if (dateObj) {
              const yyyy = dateObj.y.toString().padStart(4, "0");
              const mm = dateObj.m.toString().padStart(2, "0");
              const dd = dateObj.d.toString().padStart(2, "0");
              currentRow.push(`${yyyy}-${mm}-${dd}`);
            } else {
              currentRow.push(cell.v.toString());
            }
          } else if (typeof cell.v === "number") {
            currentRow.push(cell.v.toString());
          } else {
            currentRow.push(String(cell.v));
          }
        }
        allRows.push(currentRow);

        if (row !== range.s.r) {

          const user: UserByExcel = {
            NroContract: currentRow[0],
            firstname: currentRow[1],
            lastname: currentRow[2],
            address: currentRow[3],
            DateSold: currentRow[4],
            Expiration: currentRow[5],
            email: currentRow[6],
            SecondaryEmail: currentRow[7],
            phone: currentRow[8],
            birthday: currentRow[9],
            IdCountry: currentRow[10],
            stateId: currentRow[11],
            IdCity: currentRow[12],
            packageId: currentRow[13],
            languageId: currentRow[14],
            StatusWallet: currentRow[15],
            discount: currentRow[16],
            Note: currentRow[17],
            photo:
              "https://res.cloudinary.com/devz7obre/image/upload/v1743004842/pngtree-user-profile-avatar-vector-admin-png-image_5289693_szfiow.png",
            IdLocation: currentRow[18],
            coOwnerTelephone: currentRow[19],
          };

          users.push(user);
        }
      }
      const chunkArray = <T,>(arr: T[], size: number): T[][] => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size));
        }
        return result;
      };

      const blocks = chunkArray(users, 500);
      for (const block of blocks) {
        try {
          const resp = await ImportUserByExcel(block);
          setrecord((prev) => [...prev, ...resp]);
          console.log("Bloque importado con éxito");
        } catch (err) {
          console.error("Error al importar bloque:", err);
        }
      }

      setLoading(false);
      console.log("Importación completada");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const onclick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Button color="danger" variant="flat" onPress={onclick}>
        Subir archivo
      </Button>

      <input
        type="file"
        accept=".xlsx"
        ref={fileInputRef}
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <ModalInformation
        isOpen={isOpen}
        isloading={loading}
        onClose={onClose}
        onOpenChange={onOpenChange}
        text={record}
      />
    </div>
  );
};
