const IconButton = ({ children, onClick }) => {
    return (
        <div className='icon-btn' onClick={onClick}>
            {children}
        </div>
    );
}

export default IconButton;