'use client';
import { ListModules } from "@/actions/modules.action";
import { Modules } from "@/interfaces/module-interfaces";
import { Checkbox, CheckboxGroup, Spinner } from "@nextui-org/react"
import { SetStateAction, useEffect, useState } from "react"

interface Props {
  groupSelected: string[];
  setGroupSelected: (value: SetStateAction<string[]>) => void;
}

export const ChecboxModules = ({groupSelected,setGroupSelected}:Props) => {
    const [date, setDate] = useState<Modules[]>([]);
    const [loading, setLoading] = useState(false);
    const GetModules = async () => {
        setLoading(true);
        const resp = await ListModules();
        setDate(resp);
        setLoading(false);

    }
    useEffect(() => {
        GetModules();
    }, [])
    
    if (loading) {
        return <div className="w-full h-[100px] grid justify-center">
             <Spinner/>
        </div>

    }


  return (
    <CheckboxGroup
    label="Modulos"
    value={groupSelected}
    onChange={setGroupSelected}
  >
    {date.map((item) => (
      <Checkbox key={item.moduleid} value={item.moduleid}>
        {item.name}
      </Checkbox>
    ))}

  </CheckboxGroup>
  )
}
