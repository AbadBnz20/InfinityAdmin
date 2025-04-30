import { SeadustRequest } from "@/interfaces/reservation-interfaces";
import React from "react";
import * as XLSX from "xlsx";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@nextui-org/react";
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
    fontSize: 10,
    paddingHorizontal: 4,
  },
  // Anchos específicos para cada celda
  cellStart: { width: "12%" },
  cellEnd: { width: "12%" },
  cellName: { width: "18%" },
  cellEmail: { width: "18%" },
  cellPhone: { width: "15%" },
  cellRoom: { width: "10%" },
  cellAdults: { width: "7%" },
  cellChildren: { width: "7%" },
  cellState: { width: "8%" },
});

interface Props {
  data: SeadustRequest[];
  date: string;
  fullname: string;
}

export const PdfTemplateSeadust = ({ data, date, fullname }: Props) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "center" }}>
        Listado de Solicitudes Seadust
      </Text>
      <View style={styles.table}>
        <View fixed style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.cellStart]}>Fecha Inicio</Text>
          <Text style={[styles.cell, styles.cellEnd]}>Fecha Fin</Text>
          <Text style={[styles.cell, styles.cellName]}>Nombre Completo</Text>
          <Text style={[styles.cell, styles.cellEmail]}>Email</Text>
          <Text style={[styles.cell, styles.cellPhone]}>Celular</Text>
          {/* <Text style={[styles.cell, styles.cellRoom]}>Habitación</Text> */}
          <Text style={[styles.cell, styles.cellAdults]}>Adultos</Text>
          <Text style={[styles.cell, styles.cellChildren]}>Niños</Text>
          <Text style={[styles.cell, styles.cellState]}>Estado</Text>
        </View>

        {data.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={[styles.cell, styles.cellStart]}>
              {item.start_date}
            </Text>
            <Text style={[styles.cell, styles.cellEnd]}>{item.end_date}</Text>
            <Text style={[styles.cell, styles.cellName]}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
            <Text style={[styles.cell, styles.cellPhone]}>{item.phone}</Text>
            {/* <Text style={[styles.cell, styles.cellRoom]}>{item.IdRoom}</Text> */}
            <Text style={[styles.cell, styles.cellAdults]}>{item.adult}</Text>
            <Text style={[styles.cell, styles.cellChildren]}>
              {item.children}
            </Text>
            <Text style={[styles.cell, styles.cellState]}>
              {item.state ? "Activo" : "Inactivo"}
            </Text>
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
            Usuario: {fullname} {date}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
interface PropsMain {
  data: SeadustRequest[];
}

export const DownloadReservation = ({ data }: PropsMain) => {
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
      <PdfTemplateSeadust
        data={data}
        date={formattedDate}
        fullname={useractive}
      />
    ).toBlob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Solicitudes_Seadust.pdf";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  const handleExportToExcel = () => {
    const columns = [
      "Fecha Inicio",
      "Fecha Fin",
      "Nombre Completo",
      "Email",
      "Celular",
      "Adultos",
      "Niños",
      "Estado",
    ];

    const rows = data.map((item) => [
      item.start_date,
      item.end_date,
      `${item.firstName} ${item.lastName}`,
      item.email,
      item.phone,
      item.adult,
      item.children,
      item.state ? "Activo" : "Inactivo",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Solicitudes Seadust");
    XLSX.writeFile(wb, "Solicitudes_Seadust.xlsx");
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
