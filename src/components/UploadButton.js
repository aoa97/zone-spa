import { Button } from "semantic-ui-react";

const UploadButton = ({ children, onChange, style, fluid, icon }) => {
    return (
        <>
            <Button
                as="label"
                htmlFor="file"
                type="button"
                icon={icon}
                fluid={fluid}
                style={style}
            >{children}</Button>

            <input type="file" id="file" onChange={onChange} style={{ display: "none" }} />
        </>
    );
}

export default UploadButton;
