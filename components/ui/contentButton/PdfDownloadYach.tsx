"use client";
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
import { YachsRequest } from "@/interfaces/YachtsRequest";
import * as XLSX from "xlsx";
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

interface Props {
  data: YachsRequest[];
}

export const PdfTemplateYachs = ({ data }: Props) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "center" }}>
        Listado de Solicitudes de Yates
      </Text>
      <View style={styles.table}>
        {/* Encabezados */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.cellDate]}>Fecha</Text>
          <Text style={[styles.cell, styles.cellTime]}>Tiempo</Text>
          <Text style={[styles.cell, styles.cellPassengers]}>Pasajeros</Text>
          <Text style={[styles.cell, styles.cellName]}>Nombre Completo</Text>
          <Text style={[styles.cell, styles.cellEmail]}>email</Text>
          <Text style={[styles.cell, styles.cellPhone]}>Celular</Text>
          <Text style={[styles.cell, styles.cellPackage]}>Paquete Yate</Text>
          <Text style={[styles.cell, styles.cellExperience]}>
            Tipo de Experiencia
          </Text>
          <Text style={[styles.cell, styles.cellYacht]}>Motor</Text>
          <Text style={[styles.cell, styles.cellState]}>Estado</Text>
        </View>

        {/* Filas de datos */}
        {data.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={[styles.cell, styles.cellDate]}>{item.date}</Text>
            <Text style={[styles.cell, styles.cellTime]}>{item.time}</Text>
            <Text style={[styles.cell, styles.cellPassengers]}>
              {item.passengers}
            </Text>
            <Text style={[styles.cell, styles.cellName]}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
            <Text style={[styles.cell, styles.cellPhone]}>{item.phone}</Text>
            <Text style={[styles.cell, styles.cellPackage]}>
              {item.packageYachtId ? "Sí" : "No"}
            </Text>
            <Text style={[styles.cell, styles.cellExperience]}>
              {item.typeOfExperience?.name ?? ""}
            </Text>
            <Text style={[styles.cell, styles.cellYacht]}>
              {item.motorYacht?.name ?? ""}
            </Text>
            <Text style={[styles.cell, styles.cellState]}>
              {item.state ? "Activo" : "Inactivo"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const PdfDownloadYach = ({ data }: Props) => {
  const handleDownload = async () => {
    const blob = await pdf(<PdfTemplateYachs data={data} />).toBlob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Solicitudes.pdf";
    link.click();

    // Limpieza
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  const handleExportToExcel = () => {
    // Prepara las columnas (encabezados)
    const columns = [
      "Fecha",
      "Tiempo",
      "Pasajeros",
      "Nombre Completo",
      "email",
      "Celular",
      "Paquete Yate",
      "Tipo de Experiencia",
      "Motor",
      "Estado",
    ];

    // Prepara los datos de las filas
    const rows = data.map((item) => [
      item.date,
      item.time,
      item.passengers,
      `${item.firstName} ${item.lastName}`,
      item.email,
      item.phone,
      item.packageYachtId ? "Sí" : "No",
      item.typeOfExperience?.name ?? "",
      item.motorYacht?.name ?? "",
      item.state ? "Activo" : "Inactivo",
    ]);

    // Crear el libro de trabajo
    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Solicitudes Yates");

    // Exportar a archivo Excel
    XLSX.writeFile(wb, "Solicitudes_Yates.xlsx");
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
