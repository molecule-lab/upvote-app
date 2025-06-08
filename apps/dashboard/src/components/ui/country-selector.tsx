import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { SelectValue } from "@radix-ui/react-select";
import { countries } from "@/lib/countries";

export function CountrySelector({
  onValueChange,
  value,
}: {
  onValueChange: any;
  value: string;
}) {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select Country' />
      </SelectTrigger>
      <SelectContent className='max-h-[300px]'>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.flag}&nbsp;&nbsp;&nbsp;{country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
