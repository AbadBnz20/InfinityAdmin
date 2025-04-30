import { Journey } from "@/interfaces/journey-interfaces";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@nextui-org/react";
import * as XLSX from "xlsx";
import { createClient } from "@/utils/supabase/client";
interface Props {
  data: Journey[];
  date: string;
  fullname: string;
}

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
  cellDate: { width: "10%" },
  cellTime: { width: "10%" },
  cellPassengers: { width: "8%" },
  cellName: { width: "20%" },
  cellEmail: { width: "20%" },
  cellPhone: { width: "18%" },
  cellPackage: { width: "10%" },
  cellExperience: { width: "10%" },
  cellYacht: { width: "8%" },
  cellState: { width: "8%" },
});
export const PdfTemplateJourney = ({ data, date, fullname }: Props) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "center" }}>
        Listado de Cotizaciones de Viajes
      </Text>
      <View style={styles.table}>
        <View fixed style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.cellDate]}>Fecha Salida</Text>
          <Text style={[styles.cell, styles.cellDate]}>Fecha Retorno</Text>
          <Text style={[styles.cell, styles.cellPassengers]}>Pasajeros</Text>
          <Text style={[styles.cell, styles.cellName]}>Nombre</Text>
          <Text style={[styles.cell, styles.cellEmail]}>Email</Text>
          <Text style={[styles.cell, styles.cellPhone]}>Teléfono</Text>
          <Text style={[styles.cell, styles.cellName]}>Origen</Text>
          <Text style={[styles.cell, styles.cellName]}>Destino</Text>
          <Text style={[styles.cell, styles.cellPackage]}>Presupuesto</Text>
        </View>

        {data.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={[styles.cell, styles.cellDate]}>
              {item.departure_date}
            </Text>
            <Text style={[styles.cell, styles.cellDate]}>
              {item.return_date}
            </Text>
            <Text
              style={[styles.cell, styles.cellPassengers]}
            >{`Adultos:${item.adult}, Niños: ${item.childrens.join(", ")}`}</Text>
            <Text style={[styles.cell, styles.cellName]}>{item.user}</Text>
            <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
            <Text style={[styles.cell, styles.cellPhone]}>{item.phone}</Text>
            <Text style={[styles.cell, styles.cellName]}>
              {item.country_origin} - {item.city_origin}
            </Text>
            <Text style={[styles.cell, styles.cellName]}>
              {item.contry_destination} - {item.city_destination}
            </Text>
            <Text style={[styles.cell, styles.cellPackage]}>
              ${item.budget.toLocaleString()}
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
  data: Journey[];
}
export const DownloadJourney = ({ data }: PropsMain) => {
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
      <PdfTemplateJourney
        data={data}
        date={formattedDate}
        fullname={useractive}
      />
    ).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Solicitudes_Viajes.pdf";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  const handleExportToExcel = () => {
    const columns = [
      "Fecha Salida",
      "Fecha Retorno",
      "Nombre",
      "Email",
      "Teléfono",
      "Origen",
      "Destino",
      "Presupuesto",
      "Adultos",
      "Niños",
    ];

    const rows = data.map((item) => [
      item.departure_date,
      item.return_date,
      item.user,
      item.email,
      item.phone,
      `${item.country_origin} - ${item.city_origin}`,
      `${item.contry_destination} - ${item.city_destination}`,
      `$${item.budget.toLocaleString()}`,
      `${item.adult}`,
     `${ item.childrens.length === 0 ? "0" : item.childrens.join(", ")}`,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cotizaciones");
    XLSX.writeFile(wb, "Solicitudes_Viajes.xlsx");
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
