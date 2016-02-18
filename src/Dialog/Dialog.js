import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

const prevent = (event) => event.preventDefault();

class Dialog extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onCancel: PropTypes.func,
        open: PropTypes.bool
    };

    static defaultProps = {
        onCancel: prevent
    };

    componentDidMount() {
        this.refs.dialog.addEventListener('cancel', prevent);
        if(this.props.open) {
            findDOMNode(this).showModal();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.open !== prevProps.open) {
            if(this.props.open) {
                findDOMNode(this).showModal();

                // display the dialog at the right location
                // needed for the polyfill, otherwise it's not at the right position
                const bodyHeight = document.body.clientHeight;
                const dialogHeight = this.refs.dialog.clientHeight;
                this.refs.dialog.style.position = 'fixed';
                this.refs.dialog.style.top = `${(bodyHeight - dialogHeight) / 2}px`;
            }
            else {
                findDOMNode(this).close();
            }
        }
    }

    componentWillUnmount() {
        this.refs.dialog.removeEventListener('cancel', prevent);
    }

    render() {
        const { className, children, open, ...otherProps } = this.props;

        const classes = classNames('mdl-dialog', className);

        return (
            <dialog ref="dialog" className={classes} {...otherProps}>
                {children}
            </dialog>
        );
    }
}

export default Dialog;
