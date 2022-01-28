import { useState } from "react";
import Form from "react-bootstrap/Form";



const Checkbox = () => {
    const [checked, setChecked] = useState(false);

    return (
        <Form>
            <Form.Check type="checkbox" id="checkbox" aria-label="checkbox" defaultChecked={checked}
            onChange={() => setChecked(!checked)} />
        </Form>
    );
};


export default Checkbox;
