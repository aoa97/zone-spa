const IconButton = ({ children, onClick, text }) => {
    return (
        <div className='icon-btn' onClick={onClick} style={{ paddingLeft: text && 0 }}>
            {children}
        </div>
    );
}

export default IconButton;