import { ChartsInterfacesResult, ResultResult } from '@/interfaces/Charts-interfaces';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react'
interface Props {
  data: ChartsInterfacesResult;
  label: string;
}
export const DeviceType = ({data,label}:Props) => {
  return (
    <div className="my-5">
        <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>{label}</TableColumn>
        <TableColumn>Total</TableColumn>
       
      </TableHeader>
      <TableBody>
        <>
        {
            data.result && data.result.map((item: ResultResult, index: number) => (
                <TableRow key={index}>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.aggregated_value}</TableCell>
                </TableRow>
            ))
        }
        </>
       
      </TableBody>
    </Table>
    </div>
  )
}
