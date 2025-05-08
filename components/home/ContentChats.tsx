"use client";

import { ChartsInterfacesResult } from "@/interfaces/Charts-interfaces";
import { PageView } from "./PageView";
import { Uniquevisitors } from "./Uniquevisitors";
import { DeviceType } from "./DeviceType";
import { MapsVisitors } from "./MapsVisitors";

interface Props {
  data: ChartsInterfacesResult[];
}
export const ContentChats = ({ data }: Props) => {
  const pageView = data.find((item) => item.id === 2486772);
  const sessions = data.find((item) => item.id === 2486378);
  const visitors = data.find((item) => item.id === 2486750);
  const uniqueVisitors = data.find((item) => item.id === 2486679);
  const deviceType = data.find((item) => item.id === 2486740);
  const path = data.find((item) => item.id === 2486710);
  const maps = data.find((item) => item.id === 2723556);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          {pageView && (
            <PageView
              data={pageView}
              title="Total Vistas"
              description="Vistas"
            />
          )}
        </div>
        <div>
          {sessions && (
            <PageView
              data={sessions}
              title="Inicios de Sesion"
              description="Ingresos"
            />
          )}
        </div>
        <div>
          {visitors && (
            <PageView data={visitors} title="Visitantes" description="vistas" />
          )}
        </div>
      </div>
      <div>{uniqueVisitors && <Uniquevisitors data={uniqueVisitors} />}</div>
      <div>{maps && <MapsVisitors data={maps} />}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>{path && <DeviceType data={path} label="Paths" />}</div>
        <div>
          {deviceType && <DeviceType data={deviceType} label="Dispositivos" />}
        </div>
      </div>
     
    </>
  );
};
