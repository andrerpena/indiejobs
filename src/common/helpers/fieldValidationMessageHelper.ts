import * as fieldValidation from "./fieldValidationHelper";

export function getErrorMessage(error: string) {
    switch (error) {
        // Generic
        case fieldValidation.REQUIRED:
            return "Required.";
        case fieldValidation.MIN_LENGTH_4:
            return "Min size: 4 characters";
        case fieldValidation.MAX_LENGTH_50:
            return "Max size: 50 characters.";
        case fieldValidation.MAX_LENGTH_80:
            return "Max size: 80 characters.";
        case fieldValidation.MAX_LENGTH_255:
            return "Max size: 255 characters.";
        case fieldValidation.MAX_LENGTH_5000:
            return "Max size: 5000 characters.";
        case fieldValidation.USER_NAME_IS_TAKEN:
            return "This name is taken.";
        case fieldValidation.URL:
            return "Invalid URL.";
        // Specific
        case fieldValidation.REQUIRED_SEARCH_TAGS:
            return "When the location is specified, the expertise is required";
        case fieldValidation.ALL_GROUPS_MUST_HAVE_BETWEEN_1_AND_10_ITEMS:
            return "Every list must have at least 1 item and no more than 10.";
        case fieldValidation.TOO_MANY_TAGS:
            return "You can't select more than 8 tags";
        default:
            return error ? "Invalid value." : null;
    }
}
