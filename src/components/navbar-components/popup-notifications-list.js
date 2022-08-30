import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, IconButton, List, ListItemButton, ListItemText, ListSubheader, Popover } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import styles from './popup-notifications-list.module.css';
import { withWebsocket } from './with-websocket';
import { fetchInternalNotifications } from '../../store/reducers/InternalNotificationsSlice';

const stylePopupItemsList = {
    elevation: 0,
    sx: {
        width: '300px',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 0,
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 2,
            right: 13,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};

const PopupNotificationsList = (props) => {
    const {stompClient} = props;
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user.id);
    const notifications = useSelector(state => state.internalNotifications.internalNotifications);
    console.log('notifications', notifications)
    const notificationsCount = notifications.length;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        dispatch(fetchInternalNotifications(userId))
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if(userId && stompClient) {
            stompClient.connect({}, onConnected);
        }

        function onConnected() {
            stompClient.subscribe(`/topic/${userId}`, function(data) {
                console.log('data.body', data.body);
            });
        }

    }, [stompClient, userId]);

    return (
        <>
            <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
                <Badge color='error' overlap='circular' variant='dot' invisible={!notificationsCount}>
                    <NotificationsOutlinedIcon color={'primary'} />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ ...stylePopupItemsList }}
            >
                <List
                    aria-labelledby='subheader'
                    subheader={
                        <>
                            <ListSubheader
                                className={styles.title}
                                component='div'
                                id='subheader'>
                                <span>Notifications</span>
                                <span className={styles.notificationsCount}>{notificationsCount}</span>
                            </ListSubheader>
                        </>
                    }
                >
                    {notifications && notificationsCount
                        ? notifications.map(notification => {
                            return (
                                <ListItemButton key={notification.id}>
                                    <ListItemText primary={notification.text} />
                                </ListItemButton>
                            );
                        })
                        : <ListItemText primary={'No notifications yet'} sx={{ textAlign: 'center' }} />
                    }

                </List>
            </Popover>
        </>
    );
};

export const PopupNotificationsListWithWebsocket = withWebsocket(PopupNotificationsList);