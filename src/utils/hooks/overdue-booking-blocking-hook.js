import { useBoolean } from './boolean-hook';
import { useSelector } from 'react-redux';

export const useOverdueBookingBlocking = () => {
    const [isBlockingModalOpen, setBlockingModalOpen, setBlockingModalClose] = useBoolean();
    const roles = useSelector(state => state.user.user.roles);
    const isReaderRole = roles?.length > 0;

    const handleBlockingOrAction = (handleAction, e) => {
        isReaderRole
            ? handleAction()
            : setBlockingModalOpen(e);
    };

    return {
        isBlockingModalOpen,
        setBlockingModalClose,
        handleBlockingOrAction,
    };
};