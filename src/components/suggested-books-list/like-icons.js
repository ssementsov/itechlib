import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import style from './like-icons.module.css';
import { types } from '../../types';
import { voteType } from '../../common/constants';
import { useOverdueBookingBlocking } from '../../utils/hooks/overdue-booking-blocking-hook';
import { BlockingModal } from '../../common/UI/modals/blocking-modal';

export const LikeIcons = (props) => {
    const { isView, book, onNegativeVote, onPositiveVote } = props;
    const negativeVote = book.suggestedBookVoteCounter.negativeCount;
    const positiveVote = book.suggestedBookVoteCounter.positiveCount;
    const isNegativeVoted = book.suggestedBookVoteCounter.currentUserVoteType === voteType.negative.name;
    const isPositiveVoted = book.suggestedBookVoteCounter.currentUserVoteType === voteType.positive.name;
    let theme = useTheme();

    //overdue booking
    const {
        isBlockingModalOpen,
        setBlockingModalClose,
        handleBlockingOrAction,
    } = useOverdueBookingBlocking();

    return (
        <>
            <BlockingModal
                open={isBlockingModalOpen}
                onClose={setBlockingModalClose}
            />
            <div className={isView ? style.likeIconInfoArea : style.likeIconArea}>
                <span style={{ color: theme.palette.info.main }}>{negativeVote}</span>
                <IconButton
                    color='info'
                    aria-label='thumb down'
                    component='span'
                    sx={{ padding: '0 8px' }}
                    onClick={(e) => handleBlockingOrAction(() => onNegativeVote(e, book.id), e)}
                >
                    {isNegativeVoted ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
                </IconButton>
                <span style={{ color: theme.palette.info.main }}>{positiveVote}</span>
                <IconButton
                    color='info'
                    aria-label='thumb up'
                    component='span'
                    sx={{ padding: '0 8px' }}
                    onClick={(e) => handleBlockingOrAction(() => onPositiveVote(e, book.id), e)}
                >
                    {isPositiveVoted ? (
                        <ThumbUpIcon sx={{ color: theme.palette.primary.main }} />
                    ) : (
                        <ThumbUpAltOutlinedIcon />
                    )}
                </IconButton>
            </div>
        </>
    );
};

LikeIcons.propTypes = {
    isView: PropTypes.bool,
    book: types.suggestedBookTypes,
};
