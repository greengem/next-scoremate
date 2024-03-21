import { Input } from "@nextui-org/input"
import { ComponentProps } from 'react';

type InputProps = ComponentProps<typeof Input>;

export default function CustomInput(props: InputProps) {
    return (
        <Input
            size="sm"
            classNames={{
                inputWrapper: 'bg-ctp-mantle data-[hover=true]:bg-ctp-crust group-data-[focus=true]:bg-ctp-crust',
            }}
            {...props}
        />
    )
}