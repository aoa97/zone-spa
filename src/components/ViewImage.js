import { Modal, Image } from 'semantic-ui-react';


const ViewImage = ({ open, onClose }) => {
    return (
        <Modal closeIcon open={open} onClose={onClose}>
            <Modal.Content style={{ padding: 0 }}>
                <Image
                    fluid
                    src={open}
                />
            </Modal.Content>
        </Modal>
    );
}

export default ViewImage;