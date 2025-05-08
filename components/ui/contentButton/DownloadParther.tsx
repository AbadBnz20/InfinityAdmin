import { User } from "@/interfaces/users-interfaces";
import { Button } from "@nextui-org/react";
import React from "react";
import * as XLSX from "xlsx";

import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { createClient } from "@/utils/supabase/client";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#fff",
  },
  table: {
    width: "auto",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
  },
  headerRow: {
    backgroundColor: "#eee",
    fontWeight: "bold",
    flexDirection: "row",
  },
  cell: {
    fontSize: 8,
    paddingHorizontal: 4,
    width: "8%", 
  },
   cellsmall:{
    fontSize: 8,
    paddingHorizontal: 4,
    width: "5%",
   }
});
interface Props {
    data: User[];
    date: string;
    fullname: string;
  }
  
export const PdfTemplateUsers = ({ data, date, fullname }: Props) => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "center" }}>
          Listado de Usuarios
        </Text>
        <View style={styles.table}>
          {/* Encabezados */}
          <View fixed style={[styles.row, styles.headerRow]}>
            <Text style={styles.cell}>Nro de Contrato</Text>
            <Text style={styles.cell}>Nombre</Text>
            <Text style={styles.cell}>Dirección</Text>
            <Text style={styles.cell}>Estado</Text>
            <Text style={styles.cell}>Email</Text>
            <Text style={styles.cell}>Celular</Text>
            <Text style={styles.cell}>Fecha de Nacimiento</Text>
            {/* <Text style={styles.cell}>Descuento</Text> */}
            <Text style={styles.cell}>Fecha de Inicio</Text>
            <Text style={styles.cell}>Fecha de Expiración</Text>
            <Text style={styles.cell}>Email Secundario</Text>
            <Text style={styles.cellsmall}>Billetera</Text>
            <Text style={styles.cell}>Nota</Text>
            {/* <Text style={styles.cell}>Fecha de Creación</Text> */}
            <Text style={styles.cell}>Paquete</Text>
            <Text style={styles.cellsmall}>Lenguaje</Text>
          </View>
  
          {/* Filas de datos */}
          {data.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={styles.cell}>{item.NroContract}</Text>
              <Text style={styles.cell}>{item.firstname} {item.lastname}</Text>
              <Text style={styles.cell}>{item.address}</Text>
              <Text style={styles.cell}>{item.state?.name ?? ""}</Text>
              <Text style={styles.cell}>{item.email}</Text>
              <Text style={styles.cell}>{item.phone}</Text>
              <Text style={styles.cell}>{item.birthdate}</Text>
              {/* <Text style={styles.cell}>{item.discount}</Text> */}
              <Text style={styles.cell}>{item.DateSold}</Text>
              <Text style={styles.cell}>{item.Expiration}</Text>
              <Text style={styles.cell}>{item.SecondaryEmail}</Text>
              <Text style={styles.cellsmall}>{item.StatusWallet}</Text>
              <Text style={styles.cell}>{item.Note}</Text>
              {/* <Text style={styles.cell}>{item.created_at}</Text> */}
              <Text style={styles.cell}>{item.package?.name ?? ""}</Text>
              <Text style={styles.cellsmall}>{item.language?.name ?? ""}</Text>
            </View>
          ))}
        </View>
  
       
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 4,
            left: 0,
            right: 0,
            height: 20,
          }}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontSize: 10,
              color: "#aaa",
            }}
          >
            <Text
              render={({ pageNumber, totalPages }) =>
                `Página ${pageNumber} de ${totalPages}`
              }
            />
          </View>
          <View
            style={{
              position: "absolute",
              right: 10,
              textAlign: "right",
              fontSize: 10,
              color: "#aaa",
            }}
          >
            <Text>
              Usuario: {fullname} - {date}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );




interface PropsMain {
  data: User[];
}

export const DownloadParther = ({ data }: PropsMain) => {


     const handleDownload = async () => {
        const supabase = await createClient();
        const user = await supabase.auth.getUser();
        const useractive = `${user.data.user?.user_metadata.firstname} ${user.data.user?.user_metadata.lastname}`;
        const date = new Date();
        const nowdate = date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const nowtime = date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        const formattedDate = `${nowtime} - ${nowdate} `;
    
        const blob = await pdf(
          <PdfTemplateUsers
            data={data}
            date={formattedDate}
            fullname={useractive}
          />
        ).toBlob();
    
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Socios.pdf";
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
      };



  const handleExportToExcel = () => {
    const columns = [
      "Nro de Contrato",
      "Nombre",
      "Apellido",
      "Direccion",
      "Imagen",
      "Estado",
      "Email",
      "Celular",
      "Fecha de Nacimiento",
      "Descuento",
      "Fecha de Inicio",
      "Fecha de Expiracion",
      "Email Secundario",
      "Billetera",
      "Nota",
      "created_at",
      "Paquete",
      "Lenguaje",
    ];

    const rows = data.map((item) => [
      item.NroContract,
      item.firstname,
      item.lastname,
      item.address,
      item.photo,
      item.state?.name || "",
      item.email,
      item.phone,
      item.birthdate,
      item.discount,
      item.DateSold,
      item.Expiration,
      item.SecondaryEmail,
      item.StatusWallet,
      item.Note,
      item.created_at,
      item.package?.name || "",
      item.language?.name || "",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Socios");

    XLSX.writeFile(wb, "Socios.xlsx");
  };

  return (
    <div className="flex gap-2">
      <Button color="danger" variant="flat" onPress={handleDownload}>
        Descargar PDF
      </Button>
      <Button color="success" variant="flat" onPress={handleExportToExcel}>
        Exportar a Excel
      </Button>
    </div>
  );
};
