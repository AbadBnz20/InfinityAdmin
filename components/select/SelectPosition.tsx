import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StateFormAdmin } from "../form/AdminForm";
import { Position } from "@/interfaces/position-interfaces";
import { useEffect, useState } from "react";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { ListPositions } from "@/actions/position.action";


interface Props {
    register: UseFormRegister<StateFormAdmin>;
    errors: FieldErrors<StateFormAdmin>;
    watch: UseFormWatch<StateFormAdmin>;
  }

  export const SelectPosition = ({ register, errors,watch }: Props) => {
    const value = watch("IdPosition");
    const [data, setdata] = useState<Position[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const GetCountry = async () => {
        setLoading(true);
        const resp = await ListPositions();
        setdata(resp);
        setLoading(false);
      };
  
      GetCountry();
    }, [value]);
    if (loading) {
      return (
        <div className="my-4">
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="max-w-md"
          />
        </div>
      );
    }

    return (
        <Select
        items={data}
        label="Puesto"
        placeholder="Seleccione Puesto"
        {...register("IdPosition", { required: "El Puesto es requerido" })}
        isInvalid={!!errors.IdPosition}
        errorMessage={errors.IdPosition?.message}
      >
          {(item) => <SelectItem key={item.IdPosition}>{item.name}</SelectItem>}
      </Select>
    )
  }
  