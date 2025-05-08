import { ChartsInterfacesResult } from "@/interfaces/Charts-interfaces";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

interface Props {
  data: ChartsInterfacesResult;
  title: string;
  description: string;
}
export const PageView = ({ data,title,description }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h1>{title}</h1>
        </CardHeader>
        <CardBody>
          <h1 className="text-2xl">{data.result ? data.result[0].aggregated_value : 0}</h1>
          <p className="text-sm  text-gray-400">{description}</p>
        </CardBody>
      </Card>
    </div>
  );
};
