export const validateProductForm = (name, description, price, category_id) => {
    let isValid = true;
    let errorMessages = [];

    if (!name.trim()) {
        isValid = false;
        errorMessages.push("Product name is required.");
    }

    if (!description.trim()) {
        isValid = false;
        errorMessages.push("Description is required.");
    }

    if (!price || isNaN(price) || price <= 0) {
        isValid = false;
        errorMessages.push("Price must be a valid number greater than zero.");
    }

    if (!category_id) {
        isValid = false;
        errorMessages.push("Please select a category.");
    }

    return { isValid, errorMessages };
};

