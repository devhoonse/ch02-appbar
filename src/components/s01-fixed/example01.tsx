import React from "react";
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

type Props = WithStyles<typeof styles>;
const FixedPosition = withStyles(styles)(({ classes }: Props) => (
    <div className={classes.root}>
        <AppBar position="fixed">
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
        <div className={classes.toolbarMargin} />
        <ul>
            {new Array(500).fill(null).map((value, index) => (
                <li key={index}>{index}</li>
            ))}
        </ul>
    </div>
));
export default FixedPosition;
