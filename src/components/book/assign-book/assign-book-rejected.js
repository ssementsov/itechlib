import { WarningModalText } from '../../../common/UI';

export const AssignBookRejected = () => {
    return (
        <WarningModalText
            contentText={'Oops! You already have 5 books. Please return some book to assign a new one.'}
        />
    );
};
