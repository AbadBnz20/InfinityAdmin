import React, { useEffect, useState } from "react";
import { ChartsInterfacesResult } from "@/interfaces/Charts-interfaces";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countries from "i18n-iso-countries";
interface Props {
  data: ChartsInterfacesResult;
}

const geoUrl = "/data/country.json";

const colorScale = scaleLinear([0, 100], ["#ADD8E6", "#0000FF"]);

export const MapsVisitors = ({ data: mapas }: Props) => {
  const [data, setData] = useState<
    {
      ISO3: string | undefined;
      "2017": number;
    }[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // const formatted = Object.entries(mps).map(([iso3, value]) => ({
    //   ISO3: iso3,
    //   "2017": value,
    // }));
    // console.log(formatted)
    const formatted = mapas.result?.map((item) => {
      const [code] = item.label.split("::");
      const iso3 = countries.alpha2ToAlpha3(code);
      return {
        ISO3: iso3,
        "2017": item.aggregated_value ?? 0,
      };
    });
    if (formatted) {
      setData(formatted);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="my-5">
      <Card>
        <CardHeader>
          <h1>Mapa</h1>
        </CardHeader>
        <CardBody>
          <ComposableMap
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 140,
            }}
          >
            {/* <Sphere
              id="sphere"
              fill="transparent"
              stroke="#E4E5E6"
              strokeWidth={0.5}
            /> */}
            {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
            {data.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = data.find((s) => s.ISO3 === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
        </CardBody>
      </Card>
    </div>
  );
};
