

import { Transfer } from '@/interfaces/transfer-interfaces';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import React from 'react'
import * as XLSX from "xlsx";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    pdf,
  } from "@react-pdf/renderer";
interface PropsMain {
  data: Transfer[];
}

interface Props {
  data: Transfer[];
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
    cellCode: { width: "5%" },
    cellName: { width: "12%" },
    cellEmail: { width: "15%" },
    cellPhone: { width: "12%" },
    cellType: { width: "8%" },
    cellDate: { width: "15%" },
    cellTime: { width: "10%" },
    cellAdults: { width: "5%" },
    cellChildren: { width: "5%" },
    cellCar: { width: "10%" },
    cellLocation: { width: "10%" },
  });
  
  interface Props {
    data: Transfer[];
    date: string;
    fullname: string;
  }
  
  export const PdfTemplateTransfer = ({ data, date, fullname }: Props) => (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={{ fontSize: 14, marginBottom: 10, textAlign: "center" }}>
          Listado de Solicitudes de Transfer
        </Text>
        <View style={styles.table}>
          <View fixed style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.cellCode]}>Código</Text>
            <Text style={[styles.cell, styles.cellName]}>Nombre</Text>
            <Text style={[styles.cell, styles.cellEmail]}>Email</Text>
            <Text style={[styles.cell, styles.cellPhone]}>Teléfono</Text>
            <Text style={[styles.cell, styles.cellType]}>Tipo</Text>
            <Text style={[styles.cell, styles.cellDate]}>F. Llegada</Text>
            <Text style={[styles.cell, styles.cellTime]}>H. Llegada</Text>
            <Text style={[styles.cell, styles.cellDate]}>F. Retorno</Text>
            <Text style={[styles.cell, styles.cellTime]}>H. Retorno</Text>
            <Text style={[styles.cell, styles.cellAdults]}>Adultos</Text>
            <Text style={[styles.cell, styles.cellChildren]}>Niños</Text>
            <Text style={[styles.cell, styles.cellCar]}>Auto Ida</Text>
            <Text style={[styles.cell, styles.cellCar]}>Auto Retorno</Text>
            <Text style={[styles.cell, styles.cellLocation]}>Origen</Text>
            <Text style={[styles.cell, styles.cellLocation]}>Destino</Text>
          </View>
  
          {data.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={[styles.cell, styles.cellCode]}>
                {item.transfer_code ?? "—"}
              </Text>
              <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
              <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
              <Text style={[styles.cell, styles.cellPhone]}>{item.phone}</Text>
              <Text style={[styles.cell, styles.cellType]}>{item.type}</Text>
              <Text style={[styles.cell, styles.cellDate]}>{item.arrival_date}</Text>
              <Text style={[styles.cell, styles.cellTime]}>{item.arrival_time}</Text>
              <Text style={[styles.cell, styles.cellDate]}>{item.return_date}</Text>
              <Text style={[styles.cell, styles.cellTime]}>{item.return_time}</Text>
              <Text style={[styles.cell, styles.cellAdults]}>
                {item.passengers.aduts}
              </Text>
              <Text style={[styles.cell, styles.cellChildren]}>
                {item.passengers.children}
              </Text>
              <Text style={[styles.cell, styles.cellCar]}>
                {item.arrival_car.model}
              </Text>
              <Text style={[styles.cell, styles.cellCar]}>
                {item.return_car?.model ?? "—"}
              </Text>
              <Text style={[styles.cell, styles.cellLocation]}>
                {item.origin.name}
              </Text>
              <Text style={[styles.cell, styles.cellLocation]}>
                {item.destination.name}
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


export const DownloadTransfer = ({ data }: PropsMain) => {
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
          <PdfTemplateTransfer
            data={data}
            date={formattedDate}
            fullname={useractive}
          />
        ).toBlob();
    
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Solicitudes_Transportacion.pdf";
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
      };

        const handleExportToExcel = () => {
            const columns: string[] = [
                "Código de Transferencia",
                "Nombre",
                "Email",
                "Teléfono",
                "Tipo",
                "Fecha de Llegada",
                "Hora de Llegada",
                "Fecha de Retorno",
                "Hora de Retorno",
                "Adultos",
                "Niños",
                "Transporte Ida",
                "Transporte Retorno",
                "Origen",
                "Destino",
                "Descripción",
              ];
      
          const rows = data.map((item) => [
            item.transfer_code ?? "—",
            item.name,
            item.email,
            item.phone,
            item.type,
            item.arrival_date,
            item.arrival_time,
            item.return_date,
            item.return_time,
            item.passengers.aduts.toString(),
            item.passengers.children.toString(),
            item.arrival_car.model,
            item.return_car?.model ?? "—",
            item.origin.name,
            item.destination.name,
            item.description,
          ]);
      
          const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Solicitudes Transportacion");
          XLSX.writeFile(wb, "Solicitudes_Transportacion.xlsx");
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
  )
}
