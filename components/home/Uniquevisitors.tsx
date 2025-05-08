import { ChartsInterfacesResult } from "@/interfaces/Charts-interfaces";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
interface Props {
  data: ChartsInterfacesResult;
}

export const Uniquevisitors = ({ data }: Props) => {
  const rawData = {
    data: data.result ? data.result[0].data : [],
    labels: data.result ? data.result[0].labels : [],
  };

  const transformedData = rawData.labels?.map((label, index) => ({
    name: label,
    value: rawData.data[index],
  }));

  return (
    <div className="my-5">
      <Card>
        <CardHeader> <h1>Visitantes por dia</h1></CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={transformedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
};
