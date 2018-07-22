import React, { Component } from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';

let openSnackBarFn;

class Notifier extends Component {
    
    constructor() {
        super();
        this.state = {
            open: false,
            message: ''
        }
        console.log('open: ', this.state.open)
    }

    componentDidMount() {
        openSnackBarFn = this.openSnackBar;
    }

    openSnackBar = ({message, open}) => {
        this.setState({
            open: open,
            message: message
        });
    };

    handleSnackBarClose = () => {
        this.setState({
            open: false,
            message: ''
        })
    }

    render() {
        const message = (
            <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message}} />
        );
        return (
            <div>
                <SnackbarContent
                    message={message}
                    onClose={this.handleSnackBarClose}
                    open="false"

                />
            </div>
        );
    }
}

export function openSnackBar({message}) {
    openSnackBarFn({message})
}

export default Notifier;