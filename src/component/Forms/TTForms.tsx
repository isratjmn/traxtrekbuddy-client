import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';

type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
};

type TTTFormProps = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;

} & TFormConfig;

const TTForms = ({ children, onSubmit, resolver, defaultValues }: TTTFormProps) => {
    const methods = useForm({ resolver, defaultValues });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {children}
            </form>
        </FormProvider>
    );
};

export default TTForms;
