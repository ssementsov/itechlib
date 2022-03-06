import PropTypes from 'prop-types';
import { Card, CardMedia, Typography } from '@mui/material';
import { fictionImageLink } from '../../assets/images/fiction-image-link';
import { professionalImageLink } from './../../assets/images/professional-image-link';
import { LikeIcons } from './like-icons';
import style from './suggested-book-card.module.css';
import { types } from '../../types';

export const SuggestedBookCard = (props) => {
    const { isFiction, book } = props;
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                cursor: 'pointer',
                height: '250px',
            }}
        >
            <CardMedia
                sx={{
                    display: 'block',
                    width: '100px',
                    objectFit: 'contain',
                    margin: '0 auto',
                }}
                component="img"
                image={isFiction ? fictionImageLink : professionalImageLink}
                alt={isFiction ? 'fiction' : 'professional'}
            />
            <Typography
                gutterBottom
                variant="h5"
                align="center"
                sx={{
                    margin: '20px 0 30px',
                }}
            >
                {book.title}
            </Typography>
            <div className={style.rangeArea}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ flexBasis: '270px' }}
                >
                    Author: {book.author}
                </Typography>
                <LikeIcons />
            </div>
        </Card>
    );
};

SuggestedBookCard.propTypes = {
    isFiction: PropTypes.bool,
    book: types.suggestedBookTypes,
};
