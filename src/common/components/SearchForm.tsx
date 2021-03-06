import * as React from "react";
import { Field, FormField, FormGroup, FormRow, SelectLocation } from "./form";
import * as ReduxForm from "redux-form";
import { SelectTags } from "./form/SelectTags";

interface IndexSearchFormProps extends ReduxForm.InjectedFormProps {
    onSubmit: (formValues: any) => void;
}

const IndexSearchForm: React.SFC<IndexSearchFormProps> = (props) => {
    const {
        handleSubmit,
        onSubmit,
    } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-column flex-align-items-center ">
            <FormRow>
                <FormGroup>
                    <Field
                        name="searchTags"
                        component={FormField}
                        innerComponent={SelectTags}
                        innerComponentProps={{
                            placeholder: "Developers with experience in...",
                        }}
                    />
                </FormGroup>
            </FormRow>
            <FormRow>
                <FormGroup>
                    <Field
                        name="searchFormattedAddress"
                        placeholder="Located at"
                        component={FormField}
                        innerComponent={SelectLocation}
                        innerComponentProps={{
                            placeholder: "Located at or near...",
                        }}
                    />
                </FormGroup>
            </FormRow>
            <button type="submit" className="search vibrant">
                <i className="fa fa-search" aria-hidden="true"/>
                <span>Discover Developers</span>
            </button>
        </form>
    );
};

// Decorate with redux-form
const FormDecoratedSearchForm = ReduxForm.reduxForm({
    form: "search", // a unique identifier for this form,
    destroyOnUnmount: false,
    enableReinitialize: true,
})(IndexSearchForm);

export { FormDecoratedSearchForm as SearchForm };
