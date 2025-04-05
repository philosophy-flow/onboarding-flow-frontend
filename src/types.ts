export type FormEvent = React.ChangeEvent<HTMLInputElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;

export type InputChangeHandler = (
    inputName: string,
    inputValue: string | number,
) => Promise<void>;
export type ModularComponent = {
    handleInputChange: InputChangeHandler;
};

export type TextAreaChange = React.ChangeEvent<HTMLTextAreaElement>;
export type InputChange = React.ChangeEvent<HTMLInputElement>;
