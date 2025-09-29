export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value: string;
    onChange: (value: string) => void;
    afterSlot?: React.ReactNode;
};
