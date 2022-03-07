import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import style from './like-icons.module.css';

export const LikeIcons = (props) => {
    const { isView } = props;
    let theme = useTheme();
    return (
        <div className={isView ? style.likeIconInfoArea : style.likeIconArea}>
            <span style={{ color: theme.palette.info.main }}>0</span>
            <IconButton
                color="info"
                aria-label="thumb down"
                component="span"
                sx={{ padding: '0 8px' }}
            >
                <ThumbDownAltOutlinedIcon />
            </IconButton>
            <span style={{ color: theme.palette.info.main }}>0</span>
            <IconButton
                color="info"
                aria-label="thumb up"
                component="span"
                sx={{ padding: '0 8px' }}
            >
                <ThumbUpAltOutlinedIcon />
            </IconButton>
        </div>
    );
};

LikeIcons.propTypes = {
    isView: PropTypes.bool,
};
