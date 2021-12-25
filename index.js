const $inputs = document.querySelectorAll(".introInput input");
const $btnSubmit = document.querySelector(".introSubmit");

const setStatus = (data, errors) => {
    for (let i in data) {
        // get the parent node
        const $field = data[i].ele.parentNode.parentNode;

        // if erorrs in this data
        if (errors[i]) {
            // add Error message
            $field.querySelector("p").innerText = errors[i];

            // add Error Class
            $field.classList.add("introFieldError");
            continue;
        }

        // remove Error message
        $field.querySelector("p").innerText = "";

        // remove Error Class
        $field.classList.remove("introFieldError");
    }
};

const extractInputsValue = (reqData) => {
    const data = {};

    for (let key in reqData) {
        data[key] = reqData[key].value;
    }
    return data;
};

const validation = async (reqData) => {
    const errors = {};
    const data = extractInputsValue(reqData);

    // First Name
    if (!data.firstName) {
        errors.firstName = "First Name cannot be empty";
    }

    // Last Name
    if (!data.lastName) {
        errors.lastName = "Last Name cannot be empty";
    }

    // Email
    if (!data.email) {
        errors.email = "Email cannot be empty";
    } // Email Reg
    else if (data.email.replace(/[\w\d\@\.\_\-]+/, "")) {
        errors.email = "Looks like this is not an email";
    }

    // Password
    if (!data.password) {
        errors.password = "Password cannot be empty";
    }

    return {
        isValid: Object.entries(errors).length === 0,
        errors,
    };
};

$btnSubmit.onclick = async (e) => {
    e.preventDefault();

    const data = {};

    // extract input [element, value]
    $inputs.forEach(
        (input) => (data[input.name] = { ele: input, value: input.value })
    );

    // validation
    const { isValid, errors } = await validation(data);

    // Set status
    setStatus(data, errors);

    // when done
    if (isValid) {
        setTimeout(() => alert("Done!"), 10);
    }
};
