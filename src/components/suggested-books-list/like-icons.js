import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import style from './like-icons.module.css';
import { types } from '../../types';
import { voteType } from '../../common/constants/vote-constants';

export const LikeIcons = (props) => {
    const { isView, book, onNegativeVote, onPositiveVote } = props;
    const isNegativeVoted = book.amountVote?.currentUserVote === voteType.negative.name;
    const isPositiveVoted = book.amountVote?.currentUserVote === voteType.positive.name;
    let theme = useTheme();

    return (
        <div className={isView ? style.likeIconInfoArea : style.likeIconArea}>
            <span style={{ color: theme.palette.info.main }}>{book.amountVote?.negative || 0}</span>
            <IconButton
                color="info"
                aria-label="thumb down"
                component="span"
                sx={{ padding: '0 8px' }}
                onClick={(e) => onNegativeVote(e, book.id)}
            >
                {isNegativeVoted ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
            </IconButton>
            <span style={{ color: theme.palette.info.main }}>{book.amountVote?.positive || 0}</span>
            <IconButton
                color="info"
                aria-label="thumb up"
                component="span"
                sx={{ padding: '0 8px' }}
                onClick={(e) => onPositiveVote(e, book.id)}
            >
                {isPositiveVoted ? (
                    <ThumbUpIcon sx={{ color: theme.palette.primary.main }} />
                ) : (
                    <ThumbUpAltOutlinedIcon />
                )}
            </IconButton>
        </div>
    );
};

LikeIcons.propTypes = {
    isView: PropTypes.bool,
    book: types.suggestedBookTypes,
};
