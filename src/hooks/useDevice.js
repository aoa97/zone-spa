import { useEffect, useState } from 'react';

const useDevice = () => {
    const [width, setWidth] = useState(window.innerWidth)

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    const mobile = width <= 768
    const tablet = width <= 991

    return { mobile, tablet }
}

export default useDevice;