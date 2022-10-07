import React, {ReactNode, useCallback, useEffect, useState} from "react";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Menu, {MenuProps} from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles, Theme, WithStyles} from "@material-ui/core/styles";
import {Styles} from "@material-ui/core/styles/withStyles";
import MenuIcon from "@material-ui/icons/Menu";


const styles: Styles<Theme, {}> = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ddd"
    },
    flex: {
        flex: 1
    },
    toolbarMargin: theme.mixins.toolbar,
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

/**
 * Type Definitions
 */
type WithStylesComponentProps = WithStyles<typeof styles>;
type ScrolledAppBarProps = WithStylesComponentProps & {
    children?: ReactNode;
    title?: ReactNode;
    rightButton?: ReactNode;
    menuAnchorEl: Element | null;
    onMenuOpen: React.MouseEventHandler<HTMLButtonElement>;
    onMenuClose: MenuProps['onClose']
    downScrolling: boolean;
    animation: 'fade' | 'grow';
};


/**
 * AppBar
 */
export const CustomizableAppBar = withStyles(styles)((
    {
        children = [
            <MenuItem>PROFILE</MenuItem>,
            <MenuItem>SETTING</MenuItem>,
            <MenuItem>LOGOUT</MenuItem>
        ],
        title = (
            <Typography variant="h6" color="inherit">
                TITLE
            </Typography>
        ),
        rightButton = (
            <Button color="secondary" variant="contained">
                X
            </Button>
        ),
        classes,
        menuAnchorEl,
        onMenuOpen,
        onMenuClose,
        downScrolling,
        animation
    }: ScrolledAppBarProps
) => {

    /**
     * AppBar
     */
    const appBar = (
        <>
            <AppBar>
                <ToolBar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={onMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={onMenuClose}>
                        {children}
                    </Menu>
                    <div style={{ flex: 1 }}>
                        {title}
                    </div>
                    {rightButton}
                </ToolBar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </>
    );

    return animation === 'fade' ? (
        <Fade in={!downScrolling}>
            {appBar}
        </Fade>
    ) : (
        <Grow in={!downScrolling}>
            {appBar}
        </Grow>
    );
});

/**
 * Application
 */
const CustomAppBar = withStyles(styles)(({ classes }: WithStylesComponentProps) => {

    const [downScrolling, setDownScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    /**
     * On Menu Open
     */
    const handleMenuClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl]);

    /**
     * On Menu Close
     */
    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    /**
     * On Scroll
     */
    const onScroll: EventListener = (event: Event) => {
        const eventTarget = event.target as typeof document;
        setDownScrolling(eventTarget.documentElement.scrollTop > scrollTop);
        setScrollTop(eventTarget.documentElement.scrollTop);
    };

    /**
     * Register On Scroll Event
     * */
    useEffect(() => {
        window.addEventListener('scroll', onScroll, true);

        return () => {
            window.removeEventListener('scroll', onScroll, true);
        };
    }, [onScroll]);

    return (
        <div className={classes.root}>
            <CustomizableAppBar animation="fade"
                                downScrolling={downScrolling}
                                menuAnchorEl={anchorEl}
                                onMenuOpen={handleMenuClick}
                                onMenuClose={handleMenuClose}
                                title={(
                                    <Typography className={classes.flex} variant="h5" color="inherit">
                                        DevHoonse
                                    </Typography>
                                )}
                                rightButton={(
                                    <Button color="secondary" variant="contained">
                                        LOGIN
                                    </Button>
                            )}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </CustomizableAppBar>

            <ul>
                {new Array(500).fill(null).map((value, index) => (
                    <li key={index}>{index}</li>
                ))}
            </ul>
        </div>
    )
});
export default CustomAppBar;
