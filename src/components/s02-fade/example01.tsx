import React, {ReactNode, useCallback, useEffect, useState} from "react";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
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
    downScrolling: boolean;
    animation: 'fade' | 'grow';
};


/**
 * AppBar
 */
const ScrolledAppBar = withStyles(styles)((
    {
        classes,
        downScrolling,
        animation
    }: ScrolledAppBarProps
) => {

    const appBar = (
        <AppBar>
            <ToolBar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.flex} variant="h6" color="inherit">
                    DevHoonse
                </Typography>
                <Button color="inherit">
                    LOGIN
                </Button>
            </ToolBar>
        </AppBar>
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
const AppBarWithButtons = withStyles(styles)(({ classes }: WithStylesComponentProps) => {

    const [downScrolling, setDownScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const onScroll: EventListener = (event: Event) => {
        const eventTarget = event.target as typeof document;
        setDownScrolling(eventTarget.documentElement.scrollTop > scrollTop);
        setScrollTop(eventTarget.documentElement.scrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll, true);

        return () => {
            window.removeEventListener('scroll', onScroll, true);
        };
    }, [onScroll]);

    return (
        <div className={classes.root}>
            <ScrolledAppBar animation="fade" downScrolling={downScrolling} />
            <div className={classes.toolbarMargin} />
            <ul>
                {new Array(500).fill(null).map((value, index) => (
                    <li key={index}>{index}</li>
                ))}
            </ul>
        </div>
    )
});
export default AppBarWithButtons;
