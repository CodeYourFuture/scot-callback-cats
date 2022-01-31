import { useState } from "react";
import Form from "react-bootstrap/Form";



const Checkbox = (props) => {

    return (
        <Form>
            <Form.Check type="checkbox" id="checkbox" aria-label="checkbox" defaultChecked= {props.isChecked} onChange={(event) => props.onChange(event.target.checked)} />
        </Form>
    );
};


export default Checkbox;

// props.onChange(checked)
