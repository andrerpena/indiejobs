import React from 'react';
import PropTypes from 'prop-types';
import activity from 'react-activity';
import { FormGroup, InputGroup, TextBox } from './index';
import FaIcon from '../FaIcon';
import { getErrorMessage } from '../../lib/redux-form/fieldValidationMessageProvider';

const Dots = activity.Dots;

const FormFieldUserName = (field) => {
    const innerComponentProps = {
        input: field.input,
        meta: field.meta
    };

    const errorMessage = field.meta.touched ? getErrorMessage(field.meta.error) : null;

    function getAddOnAfterComponent(f) {
        if (f.meta.asyncValidating) return <Dots />;
        if (f.meta.error) return <FaIcon icon="exclamation-triangle" />;
        return <FaIcon icon="check" />;
    }
    const validationComponent = getAddOnAfterComponent(field);

    return (<FormGroup
        label="Nome do usuário"
        labelFor="name"
        help="A URL acima será publicamente visível se você for um profissional"
        error={errorMessage}
    >
        <InputGroup addOnBefore="indiejobs.com.br/" addOnAfter={validationComponent}>
            <TextBox {...innerComponentProps} />
        </InputGroup>
    </FormGroup>);
};

FormFieldUserName.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    validate: PropTypes.array
};

FormFieldUserName.defaultProps = {
    validate: []
};

export default FormFieldUserName;