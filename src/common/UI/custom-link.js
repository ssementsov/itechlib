import { Link } from '@mui/material';

export const CustomLink = (props) => {
    const {link} = props;
    return (
        <>
            {!link ? (
                'No link yet'
            ) : (
                <Link
                    href={link}
                    underline='hover'
                    target='_blank'
                    rel='noopener'
                >
                    {'Open site'}
                </Link>
            )}
        </>
    );
};